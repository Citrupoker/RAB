var mongoose = require('mongoose')

var verificationTokenSchema = new mongoose.Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  token: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now, expires: '1h'}
})

module.exports = mongoose.model('token', verificationTokenSchema)