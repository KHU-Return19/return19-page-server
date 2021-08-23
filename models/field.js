const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
    field:{
        type:String,
        unique:true,
        require:true
    }
})

const Field = mongoose.model('Field', fieldSchema)
module.exports = { Field }