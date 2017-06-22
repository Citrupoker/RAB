var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//=============================
// Schema
//=============================
var userSchema = new Schema({
    name: String,
    email: String,
    verified: {type: Boolean, default: false},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//=============================
// Methods
//=============================
userSchema.statics.findByName = function(name, cb) {
    this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('User', userSchema);