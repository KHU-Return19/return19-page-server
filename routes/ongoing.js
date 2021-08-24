const express = require('express')
const router = express.Router()
const { User } = require("../models/user")
const { Study } = require("../models/study")

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

router.get('/add', async(req, res) => {
    // let new_study = new Study({
    //     title: req.body.title,
    //     content: req.body.info,
    //     address: req.body.address,
    //     isFin: req.body.isFin
    // })

    //test code
    let new_study = new Study({
        title: "test",
        address: "http://google.com",
        info: "test data",
        isFin:false
    })

    new_study.save(function(err, data){
        if (err){
            console.log(err)
        }
        else {
            console.log("saved")
        }
    })
})

module.exports = router