const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        unique: true,
        reqiued: true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required:true
    },
    birthday:{
        type:Date,
        required: true,
    },
    interest:{
        type: String,
    },
    bio :{
        type: String,
    },
    img:{
        type:String,
    },
    url : {
        type:String
    }



})
const User = mongoose.model('User', userSchema)
module.exports = { User }