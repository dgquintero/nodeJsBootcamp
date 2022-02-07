exports.formCrearCuenta = (req, res ) => {
  res.render('crearCuenta', {
    nombrePagina :  'Crear Cuenta en Uptask'
  })
}

exports.CrearCuenta = (req, res) =>{
  res.send('Enviaste el form')
}
