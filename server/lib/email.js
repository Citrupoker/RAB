var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

var mailAccountUser = process.env.USER_EMAIL
var mailAccountPassword = process.env.USER_PASS


var transport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: mailAccountUser,
    pass: mailAccountPassword
  }
}))

module.exports = transport
