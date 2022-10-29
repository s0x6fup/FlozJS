const mongoose = require('mongoose'); 
var crypto = require('crypto'); 
const Schema = mongoose.Schema;


const userSchema = new Schema({ 
    username : {
        type : String, 
        required : true
    }, 
    email : { 
        type : String, 
        required : true
    },
    role : { 
        type : String, 
        required : true
    }, 
    hash : String, 
    salt : String 
}); 


// had to change "=>" (ES6 arrow) to "function" so the semantics of "this" that is handled internally by mongoose
userSchema.methods.setPassword = function(password) {
    console.log(this);
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};


userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);

    return this.hash === hash;
};


const User = mongoose.model('User', userSchema);
module.exports = User;
