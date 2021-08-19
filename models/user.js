const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken")

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
    },
    token:{
        type: String
    },
    tokenExp:{
        type: String
    }
})

userSchema.pre("save",function(next){
    var user = this
    if(user.isModified("password")){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next();
            })
        })
    }
})
const User = mongoose.model('User', userSchema)
module.exports = { User }