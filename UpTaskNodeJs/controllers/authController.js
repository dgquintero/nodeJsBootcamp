const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const enviarEmail = require('../handlers/email')


exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos Campos son Obligatorios'
})


// función para revisar si el usuario está logueado o no
exports.usuarioAutenticado = (req, res, next) => {
  // si el usuario esta autenticado, adelante
  if(req.isAuthenticated()){
    return next();
  }
  //sino esta autenticado, redirigir al formulario
  return res.redirect('/iniciar-sesion')
}

// función para cerrar sesión
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion') // al cerrar la sesion nos lleva al login
  })
}

// genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
  // verificar que un usuario exista
  const { email } = req.body
  const usuario = await Usuarios.findOne({where: { email }})

  // Si no existe el usuario
  if(!usuario) {
    req.flash('error', 'No existe esa cuenta')
    res.redirect('/reestablecer')
  }

  // usuario existe
  // token para restablecer contraseña
  usuario.token = crypto.randomBytes(20).toString('hex')
  // tiempo de expiracion del token
  usuario.expiracion = Date.now() + 3600000

  // Guardar en la base de datos 
  await usuario.save()

  // url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

  // enviar el Correo con el token
  await enviarEmail.enviar({
    usuario,
    subject: 'Password Reset',
    resetUrl,
    archivo: 'reestablecer-password'
  })

  // terminar
  req.flash('correcto', 'se envió un mensaje a tu correo')
  res.redirect('/iniciar-sesion')
}

exports.validarToken = async (req, res)=> {
  const usuario = await Usuarios.findOne({where: {token : req.params.token}})
  // sino encuentra el usuario
  if(!usuario){
    req.flash('error', 'No Válido')
    res.redirect('/reestablecer')
  }

  // Formulario para generar el password
  res.render('resetPassword', {
    nombrePagina : 'Restablecer Contraseña'
  })
}

exports.actualizarPassword = async (req, res) =>{
  // Verifica el token valido y tambien la fecha de expiración del token 
  const usuario = await Usuarios.findOne({
    where: {
      token : req.params.token,
      expiracion: {
        [Op.gte] : Date.now()
      }
    }
  })
  // Verificamos si el usuario existe
  if(!usuario) {
    req.flash('error', 'No Válido')
    res.redirect('/reestablecer')
  }

  // hashear el password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  usuario.token = null;
  usuario.expiracion = null

  //guardamos el nuevo password
  await usuario.save();

  req.flash('correcto', 'Tu password se ha modificado correctamente')
  res.redirect('/iniciar-sesion')

}
