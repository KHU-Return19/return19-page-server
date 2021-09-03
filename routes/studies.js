const express = require('express')
const router = express.Router()
const { Study } = require("../models/Study")
const { auth } = require('../middleware/auth')

router.get('/', (req, res) => {
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
                studies:study
            })
        }
    })
})

router.post('/', auth, async(req, res) => {
    let { userId } = req.decoded
    let newStudy = new Study({
        title: req.body.title,
        info: req.body.info,
        url: req.body.url,
        about: req.body.about,
        userId: userId
    })

    newStudy.save(function(err, data){
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
                study:newStudy
            })
        }
    })
})

router.delete('/:id', auth, (req, res) => {
    let { userId } = req.decoded
    Study.findOneAndDelete({_id:req.params.id, userId:userId}, (err, study)=>{
        if(err) res.json({success:false})
        res.json({success:true})
    })
})

router.get('/:id', auth, (req, res) => {
    let { userId } = req.decoded

    Study.findOne({_id: req.params.id, userId:userId}, (err, study) =>{
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

router.put('/:id', auth, (req, res) => {
    let { userId } = req.decoded
    Study.findOneAndUpdate({
        _id: req.params.id,
        userId: userId
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