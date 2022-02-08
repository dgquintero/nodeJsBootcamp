const Usuarios = require('../models/Usuarios')


exports.formCrearCuenta = (req, res ) => {
  res.render('crearCuenta', {
    nombrePagina :  'Crear Cuenta en Uptask'
  })
}

exports.formIniciarSesion = (req, res ) => {
  res.render('iniciarSesion', {
    nombrePagina :  'Iniciar Sesion en Uptask'
  })
}

exports.crearCuenta = async (req, res) =>{
  // leer los datos
  const {email, password} = req.body
  try {
    // crear el usuario
    await Usuarios.create ({ 
      email,
      password 
    })
    res.redirect('iniciar-sesion')
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message))
    // console.log(error.errors);
    res.render('crearCuenta', {
      mensajes: req.flash(),
      nombrePagina: 'Crear Cuenta en Uptask',
      email,
      password
    })
  }
}
