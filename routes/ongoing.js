const express = require('express')
const router = express.Router()
const { User } = require("../models/User")
const { Study } = require("../models/Study")
const { auth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    Study.find(function(err, study){
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else{
            console.log(study)
            return res.status(200).json({
                success:true,
                study_list:study
            })
        }
    })
})

router.post('/add', auth, async(req, res) => {
    let { userId } = req.decoded
    let new_study = new Study({
        title: req.body.title,
        info: req.body.info,
        url: req.body.url,
        about: req.body.about,
        userid: userId
    })

    new_study.save(function(err, data){
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            console.log(data)
            return res.status(200).json({
                success:true,
                study:new_study
            })
        }
    })
})

router.delete('/del', auth, async(req, res) => {
    let { userId } = req.decoded
    let result = await Study.deleteOne({
        _id: req.body._id,
        userid: userId
    })
    if (result.ok){
        return res.status(200).json({
            success:true
        })
    }
    else{
        return res.status(500).json({
            success:false,
            err
        })
    }
})

router.get('/load/:id', auth, (req, res) => {
    let { userId } = req.decoded

    Study.findOne({_id: req.params.id, userid:userId}, (err, study) =>{
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            return res.status(200).json({
                success:true,
                study: study
            })
        }
    })
})

router.put('/update/:id', auth, (req, res) => {
    let { userId } = req.decoded
    Study.findOneAndUpdate({
        _id: req.params.id,
        userid: userId
    }, {
        title: req.body.title,
        info: req.body.info,
        about: req.body.about,
        isFin: req.body.isFin,
        url: req.body.url

    },(err,user)=>{
        if(err) res.json({success:false})
        res.status(200).json({
            success:true,
        })
    })
          
})

module.exports = router