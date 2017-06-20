var mongoose = require('mongoose')

var memberSchema =  mongoose.Schema({
    coach : {type: Boolean, default: false},
    name : {type: String},
    email: {type: String},
    desc: {type: String},
    skills: [],
    roles: [],
    img: {type: String},
    website: {type: String}
})

module.exports = mongoose.model('Member', memberSchema)