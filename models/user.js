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

userSchema.pre("save", function( next ){
    var user = this
    if(user.isModified("password")){
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next();
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        console.log(err)
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this
    var token = jwt.sign(user._id.toHexString(), "secretToken")
    user.token = token
    user.save((err,user)=>{
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this
    jwt.verify(token, "secretToken", (err, decoded)=>{
        user.findOne({"_id":decoded, "token":token}, (err,user)=>{
            if(err) return cb(err)
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSchema)
module.exports = { User }