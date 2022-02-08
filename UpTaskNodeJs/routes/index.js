const express = require('express');
// const { routerShape } = require('react-router');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')

module.exports = function(){
  // ruta para el home
  router.get('/', proyectosController.proyectosHome);
  router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto',
      body('nombre').not().isEmpty().trim().escape(),
      proyectosController.nuevoProyecto
  );

  //listar proyectos
  router.get('/proyectos/:url', proyectosController.proyectoPorUrl)

  // Actualizar el proyecto
  router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
  router.post('/nuevo-proyecto/:id',
      body('nombre').not().isEmpty().trim().escape(),
      proyectosController.actualizarProyecto)


  // Eliminar Proyecto
  router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

  //Tareas
  router.post('/proyectos/:url', tareasController.agregarTarea)

  // Actualizar tarea
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

  // Eliminar tarea
  router.delete('/tareas/:id', tareasController.eliminarTarea);

  // Crear nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta)
  router.post('/crear-cuenta', usuariosController.crearCuenta)

  // Iniciar Sesión
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
  
  return router;
}
