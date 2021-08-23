const mongoose = require('mongoose')
const User = require('./user.js')
const Field = require('./field.js')

const studySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    field:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Field
    }],
    cheif:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    address:{
        type:String,
        required:true
    },
    isFin:{
        type:Boolean,
        default:false
    }
})

const Study = mongoose.model('Study', studySchema)
module.exports = { Study }