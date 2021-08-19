const express = require('express')
const router = express.Router();
const { User } = require("../models/user")


router.get('/',(req,res)=>{
    res.send('user route test')
})

router.post("/signup",(req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    user.save()
    res.send(user)
})
module.exports = router