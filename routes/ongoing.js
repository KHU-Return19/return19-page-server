const express = require('express')
const router = express.Router()
const { User } = require("../models/user")
const { Study } = require("../models/study")
const { Field } = require('../models/field')

router.get('/', (req, res, next) => {
    Study.find(function(err, study){
        if (err){
            console.log(err)
            return res.status(500).json({ message: "NaN" })
        }
        else{
            console.log(study)
            return res.status(200).json(study)
        }
    })
})

router.post('/add', async(req, res) => {
    let new_study = new Study({
        title: req.body.title,
        info: req.body.info,
        address: req.body.address,
        field: req.body.field,
        user: req.body.user
    })

    new_study.save(function(err, data){
        if (err){
            console.log(err)
            return res.status(500).json({ message: "Add failed." })
        }
        else {
            console.log(data)
            return res.status(200).json({ message: "Success" })
        }
    })
})

router.post('/addField', async(req, res) => {
    let new_field = new Field({
        field: req.body.field
    })

    new_field.save(function(err, data){
        if (err){
            console.log(err)
            return res.status(500).json({ message: "Add failed." })
        }
        else {
            console.log(data)
            return res.status(200).json({ message: "Success" })
        }
    })
})

router.delete('/del', async(req, res) => {
    let result = await Study.deleteOne({
        _id: req.body._id,
        user: req.body.user
    })
    if (result.ok){
        console.log(reslut)
        return status(200).json({ message: "Success" })
    }
    else{
        return status(500).json({ message: "Delete failed." })
    }
})

router.put('/modify', async(req, res) => {
    let result = await Study.updateOne({
        _id: req.body._id,
        user: req.body.user
    },
    {
        $set: {
            title: req.body.title,
            info: req.body.info,
            field: req.body.field,
            isFin: req.body.isFin,
            address: req.body.address
        }
    })
    if (result.ok){
        console.log(result)
        return status(200).json({ message: "Success" })
    }
    else{
        return res.status(500).json({ message: "Modify failed." })
    }
})

module.exports = router