const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

const slug = require('slug');



exports.proyectosHome =  async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render('index', {
    nombrePagina : 'Proyectos',
    proyectos
  });
}

exports.formularioProyecto =  async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render('nuevoProyecto', {
    nombrePagina : 'Nuevo Proyecto',
    proyectos
  });
}

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
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
      errores,
      proyectos
    })
  } else {
    // No hay errores
    // Insertar en la BD
    await Proyectos.create({ nombre });
    res.redirect('/');
  }
}

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url
    }
  });
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

  // Consultar tareas del proyecto actual
  const tareas = await Tareas .findAll({
    where: {
      proyectoId: proyecto.id
    },
    // traer información sobre el proyecto like join
    // include: [
    //   {model: Proyectos}
    // ]
  });

  if(!proyecto) return next ();

  // render a la vista
  res.render('tareas', {
    nombrePagina : 'Tareas del Proyecto',
    proyecto,
    proyectos,
    tareas
  })

}

exports.formularioEditar = async (req, res) => {

  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id
    }
  });
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

  // render a la vista
  res.render('nuevoproyecto', {
    nombrePagina : 'Editar Proyecto',
    proyectos,
    proyecto
  })
}

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
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
      errores,
      proyectos
    })
  } else {
    // No hay errores
    // Insertar en la BD
    await Proyectos.update(
      { nombre: nombre},
      { where: { id: req.params.id }}
      );
    res.redirect('/');
  }
}

exports.eliminarProyecto = async (req, res, next) => {
  // req, query o params para leer los datos
  // console.log(req.params)
  const {urlProyecto} = req.query;

  const resultado = await Proyectos.destroy({
    where: {url : urlProyecto}
  })

  if(!resultado){
    return next();
  }
  
  res.status(200).send('Proyecto Eliminado Correctamente');
}
