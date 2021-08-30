const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { User } = require('./User')
autoIncrement.initialize(mongoose.connection)

const studySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    isFin:{
        type:Boolean,
        default:false
    }
})

studySchema.plugin(autoIncrement.plugin,{
    model: 'studies',
    field: "seq",
    startAt: 1,
    increment: 1
})
const Study = mongoose.model('Study', studySchema)
module.exports = { Study }