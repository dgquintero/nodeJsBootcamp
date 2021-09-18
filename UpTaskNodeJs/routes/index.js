const express = require('express');
const { routerShape } = require('react-router');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');

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

  return router;
}
