const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    userfirstname: { type: String, unique: true },
    usersecondename: { type: String, unique: true },
    email: String,
    tele:String,
    avatar: { type: String, default: null }, 
    password: String,
    role: String 
});

/*userSchema.pre('save', function(next) {
    if (this.password === 'admin') {
        this.role = 'admin';
    }
    next();
});*/

userSchema.methods.hashPassword = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
  }
  
  userSchema.methods.comparePassword = (password,hash) => {
    return bcrypt.compareSync(password,hash)
  }
  


const User = mongoose.model('User', userSchema);

module.exports = User;
