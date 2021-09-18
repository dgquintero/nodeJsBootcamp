const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');


// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la base de datos
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error));


// crear una app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

//añadir las carpetas de las vistas
app.set('views', path.join(__dirname, '/views'));

// PAsar vardump a la app
app.use((req, res, next) => {
    res.locals.year = 2021;
    res.locals.vardump = helpers.vardump;
    next();
});


// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);
