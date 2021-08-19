const express = require('express')
const router = express.Router();
const { User } = require("../models/user")


router.get('/',(req,res)=>{
    res.send('user route test')
    
})

router.post("/signup",(req,res)=>{
    User.findOne({ email:req.body.email}, function(err,user){
        if(err) return res.json({find_success:false, err})
        if(user){
            return res.json({signup_success:false, msg:"이미 가입된 이메일 입니다."})
        }else{
            const newUser = new User(req.body)
            newUser.save((err, userInfo)=>{
                if(err) return res.json({ signup_success:false, err})
                return res.status(201).json({
                    success: true,
                    email : newUser.email
                })
            })
        }
    })
})
module.exports = router