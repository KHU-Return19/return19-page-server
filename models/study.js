const mongoose = require('mongoose')
const { User } = require('./User')

const studySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        tpye:String,
        required:true
    },
    userid:{
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