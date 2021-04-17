const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){ 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
const user = mongoose.model('user',userSchema);

module.exports = user;