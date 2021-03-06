const mongoose = require('mongoose')
const { User } = require('./User')

const CalendarSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    info:{
        type:String,
        default:'empty schedule'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

const Calendar = mongoose.model('Calendar', CalendarSchema)
module.exports = { Calendar }