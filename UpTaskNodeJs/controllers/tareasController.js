const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas')


exports.agregarTarea = async (req, res, next) => {
  // obtenemos el Proyecto actual
  const proyecto = await Proyectos.findOne({where: { url: req.params.url }})

  // leer el valor del input
  const {tarea} = req.body;

  // estado 0 = incompleto y id de Proyecto
  const estado = 0;
  const proyectoId = proyecto.id;

  // Insertar en la base de datos
  Tareas.create({ tarea, estado, proyectoId})

  if(!resultado){
    return next();
  }

  // redireccionar
  res.redirect('/proyectos/${req.params.url }')
}
