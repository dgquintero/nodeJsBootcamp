const passport = require('passport')

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
