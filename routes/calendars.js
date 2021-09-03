const express = require('express')
const router = express.Router()
const { Calendar } = require("../models/Calendar")
const { auth } = require("../middleware/auth")

router.get('/', auth, (req, res) => {
    Calendar.find(function(err, calendar){
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else{
            return res.status(200).json({
                success:true,
                calendars:calendar
            })
        }
    })
})

router.get('/:id', auth, (req, res) => {
    let { userId }= req.decoded
    Calendar.findOne({_id: req.params.id,userId:userId }, (err, calendar) =>{
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
                calendar: calendar
            })
        }
    })
})

router.post('/', auth, (req, res) => {
    let { userId } = req.decoded
    let newCalendar = new Calendar({
        date: req.body.date,
        info: req.body.info,
        userId: userId
    })

    newCalendar.save((err, data) => {
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            return res.status(200).json({
                success:true,
                calendar: newCalendar
            })
        }
    })
})

router.delete('/:id', auth, (req, res) => {
    let { userId } = req.decoded
    Calendar.findOneAndDelete({_id:req.params.id, userId:userId}, (err, calendar)=>{
        if(err) res.json({success:false})
        res.json({success:true})
    })
})

router.put('/:id', auth, (req, res) => {
    let { userId } = req.decoded
    Calendar.findOneAndUpdate({
        _id: req.params.id,
        userId: userId
    }, {
        date: req.body.date,
        info: req.body.info
    },(err,user)=>{
        if(err) res.json({success:false})
        res.status(200).json({
            success:true,
        })
    })
          
})

module.exports = router