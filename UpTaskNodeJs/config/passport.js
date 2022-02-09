const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// Referencia al modelo donde vamos a autenticar
const usuarios = require('../models/Usuarios')

// Local Strategy - login con credenciales propios (usuario y password)
passport.use(
  new LocalStrategy(
    // por defalut passport espera un usuario y password
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async(email, password, done) =>{
      try {
        const usuario = await Usuarios.find({
          where: {email: email}
        })
        // El usuario existe, password incorrecto
        if(!usuario.verificarPassword(password)){
          
        }
      } catch (error) {
        // Ese usuario no existe
        return done(null, false, {
          message: 'Esa cuenta no existe'
        })
      }
    }
  )
)
