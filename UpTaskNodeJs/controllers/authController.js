const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto')

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
  const resetUrl = `http//${req.headers.host}/reestablecer/${usuario.token}`
  console.log(resetUrl)
}

exports.resetPassword = async (req, res)=> {
  res.json(req.params.token)
}
