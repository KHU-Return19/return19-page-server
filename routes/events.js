const express = require('express')
const router = express.Router()
const { Event } = require("../models/event")
const { auth } = require("../middleware/auth")

router.get('/', (req, res) => {
    let { userId } = req.decode
    Event.find({ user: userId }, function(err, event){
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else{
            return res.status(200).json({
                success:true,
                event_list:event
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) =>{
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
                event: event
            })
        }
    })
})

router.post('/add', auth, (req, res) => {
    let { userId } = req.decode
    let new_event = new Event({
        date: req.body.date,
        info: req.body.info,
        time: req.body.time,
        user: userId
    })

    new_event.save((err, data) => {
        if (err){
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            return res.status(200).json({
                success:true,
                event: new_event
            })
        }
    })
})

router.delete('/del', auth, (req, res) => {
    let { userId } = req.decode
    let result = await Event.deleteOne({
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
    let { userId } = req.decode
    let result = await Event.updateOne({
        _id: req.body._id,
        user: userId
    },
    {
        $set: {
            date: req.body.date,
            info: req.body.info,
            time: req.body.time,
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