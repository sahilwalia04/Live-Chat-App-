const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    time:{
        type: Date,
        default: Date.now,
    },
})
const usrModel = mongoose.model('user' , userSchema);
module.exports = usrModel;