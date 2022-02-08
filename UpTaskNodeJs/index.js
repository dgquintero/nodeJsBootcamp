const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session= require('express-session')
const cookieParser = require('cookie-parser')


// helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la base de datos
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas')
require('./models/Usuarios');

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

// agregar flash messages
app.use(flash());

// sesiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))

// Pasar vardump a la app
app.use((req, res, next) => {
    res.locals.year = 2021;
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash()
    next();
});


// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3000);
