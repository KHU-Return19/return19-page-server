const mongoose = require('mongoose')
const { User } = require('./user')

const EventSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    info:{
        type:String,
        default:'empty schedule'
    },
    time:{
        type:String,
        defalut:'8:00 ~ 9:00'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }