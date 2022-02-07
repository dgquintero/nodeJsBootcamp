const Usuarios = require('../models/Usuarios')


exports.formCrearCuenta = (req, res ) => {
  res.render('crearCuenta', {
    nombrePagina :  'Crear Cuenta en Uptask'
  })
}

exports.crearCuenta = (req, res) =>{
  // leer los datos
  const {email, password} = req.body
  // console.log(password);
  // console.log(email);
  // crear el usuario
  Usuarios.create ({ email, password })
  .then(()=> {
    res.redirect('iniciar-sesion')
  })

}
