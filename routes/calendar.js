const express = require('express')
const router = express.Router()
const { Calendar } = require("../models/Calendar")
const { auth } = require("../middleware/auth")

router.get('/', (req, res) => {
    let { userId } = req.decoded
    Calendar.find({ user: userId }, function(err, calendar){
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else{
            return res.status(200).json({
                success:true,
                calendar_list:calendar
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Calendar.findOne({_id: req.params.id}, (err, calendar) =>{
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

router.post('/add', auth, (req, res) => {
    let { userId } = req.decoded
    let new_calendar = new Calendar({
        date: req.body.date,
        info: req.body.info,
        user: userId
    })

    new_calendar.save((err, data) => {
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            return res.status(200).json({
                success:true,
                calendar: new_calendar
            })
        }
    })
})

router.delete('/del', auth, (req, res) => {
    let { userId } = req.decoded
    let result = await Calendar.deleteOne({
        _id: req.body._id,
        user: userId
    })
    if (result.ok){
        return status(200).json({
            success:true
        })
    }
    else{
        return status(500).json({
            success:false,
            err
        })
    }
})

router.put('/modify', auth, (req, res) => {
    let { userId } = req.decoded
    let result = await Calendar.updateOne({
        _id: req.body._id,
        user: userId
    },
    {
        $set: {
            date: req.body.date,
            info: req.body.info
        }
    })
    if (result.ok){
        return status(200).json({
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