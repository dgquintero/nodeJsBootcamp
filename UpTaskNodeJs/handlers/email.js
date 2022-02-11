const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')
const email = require('../config/email')

var transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

// generar HMTL
const generarHTML = ()=> {
  const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`)
  return juice(html)
}

exports.enviar = async () => {
  let info = transport.sendMail({
    from: '"UpTask" <no-reply@uptask.com>', // sender address
    to: "correo@correo.com", // list of receivers
    subject: "Password Reset", // Subject line
    text: "Hello world?", // plain text body
    html: generarHTML() // html body
  });
}
