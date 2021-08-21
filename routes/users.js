const express = require('express')
const router = express.Router();
const { User } = require("../models/user")
const { auth } = require('../middleware/auth')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

router.get('/',(req,res)=>{
    res.send('user route test')
    
})

router.post("/signup",(req,res)=>{
    User.findOne({ email:req.body.email}, (err,user) =>{
        if(err) {
            return res.json({find_success:false, err})
        }
        if(user){
            return res.json({signup_success:false, msg:"This email already exists"})
        }else{
            const newUser = new User(req.body)
            newUser.save((err, userInfo)=>{
                if(err) return res.json({ signup_success:false, err})
                return res.status(201).json({
                    signup_success: true,
                    email : newUser.email
                })
            })
        }
    })
})

router.post("/login", (req,res)=> {
    User.findOne({ email:req.body.email},(err, user)=>{
        if(!user){
            return res.json({
                login_success:false,
                msg: "This email does not exist"
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if(!isMatch){
                return res.json({login_success: false,
                    msg: "Password incorrect"
                })
            }else{
                user.generateToken((err,user)=>{
                    if(err) return res.send(err)
                    res.cookie("x_auth", user.token).status(200).json({
                        login_success: true,
                        userId: user._id,
                        token: user.token
                    })
                })
            }
        
        })
    })
})

router.get("/logout/:userId", (req,res)=>{
    User.findOneAndUpdate({_id:req.params.userId},{token: ""},(err,user)=>{
        if(err) return res.json({logout_success:false, err})
        return res.status(200).json({
            logout_success:true
        })
    })
})

router.get("/profile/:userId", (req,res)=>{
    let { userId } = req.params
    User.findOne({_id:userId},(err, user)=>{
        if(err) return res.json({load_profile_success:false, err})
        res.status(200).json({
            load_profile_success:true
        })
    })
})

router.post("/profile/:userId/update", (req,res)=>{
    let { userId } = req.params
    let { birthday, bio, interest, img, url} = req.body
    console.log(req.body)
    User.findOneAndUpdate({_id:userId}, {birthday:birthday, bio:bio, url:url, img:img, interest:interest}, (err, user)=>{
        if(err) return res.json({update_profile_success:false, err})
        res.status(200).json({
            update_profile_success:true
        })
    })
})
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        _id: req.user._id
        
    });
});
module.exports = router