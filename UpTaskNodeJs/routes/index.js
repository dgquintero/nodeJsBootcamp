const express = require('express');
// const { routerShape } = require('react-router');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController');


module.exports = function(){
  // ruta para el home
  router.get('/',
      authController.usuarioAutenticado,
      proyectosController.proyectosHome
  );

  router.get('/nuevo-proyecto',
      authController.usuarioAutenticado,
      proyectosController.formularioProyecto
  );

  router.post('/nuevo-proyecto',
      authController.usuarioAutenticado,
      body('nombre').not().isEmpty().trim().escape(),
      proyectosController.nuevoProyecto
  );

  //listar proyectos
  router.get('/proyectos/:url',
      authController.usuarioAutenticado,
      proyectosController.proyectoPorUrl
  )

  // Actualizar el proyecto
  router.get('/proyecto/editar/:id',
      authController.usuarioAutenticado,
      proyectosController.formularioEditar
  );
  router.post('/nuevo-proyecto/:id',
      authController.usuarioAutenticado,
      body('nombre').not().isEmpty().trim().escape(),
      proyectosController.actualizarProyecto)


  // Eliminar Proyecto
  router.delete('/proyectos/:url',
      authController.usuarioAutenticado,
      proyectosController.eliminarProyecto
  );

  //Tareas
  router.post('/proyectos/:url',
      authController.usuarioAutenticado,
      tareasController.agregarTarea
  )

  // Actualizar tarea
  router.patch('/tareas/:id',
      authController.usuarioAutenticado,    
      tareasController.cambiarEstadoTarea,
  );

  // Eliminar tarea
  router.delete('/tareas/:id',
      authController.usuarioAutenticado,
      tareasController.eliminarTarea
  );

  // Crear nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta)
  router.post('/crear-cuenta', usuariosController.crearCuenta)

  // Iniciar Sesión
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
  router.post('/iniciar-sesion', authController.autenticarUsuario)

  // cerrar sesión
  router.get('/cerrar-sesion', authController.cerrarSesion)

  //Restablecer contraseña
  router.get('/reestablecer', usuariosController.formReestablecerPassword)

  return router;
}


