const mongoose = require('mongoose')
const { User } = require('./user')
const { Field } = require('./field')

const studySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        tpye:String,
        required:true
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Field,
        required:true
    },
    cheif:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
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