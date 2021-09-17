exports.proyectosHome =  (req, res) => {
  res.render('index', {
    nombrePagina : 'Proyectos'
  });
}

exports.formularioProyecto =  (req, res) => {
  res.render('nuevoProyecto', {
    nombrePagina : 'Nuevo Proyecto'
  });
}

exports.nuevoProyecto = (req, res) => {
  // enviar a la consola lo que el usuario escriba
  // console.log(req.body)

  //validar que tengamos algo en el input
  const { nombre } = req.body;

  let errores = [];

  if(!nombre) {
    errores.push({'texto': 'Agregar un Nombre al Proyecto'})
  }

  // Si hay errores
  if(errores.length > 0){
    res.render('nuevoProyecto', {
      nombrePagina :  'Nuevo Proyecto',
      errores
    })
  } else {
    // No hay errores
    // Insertar en la BD
  }
}
