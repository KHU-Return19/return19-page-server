const express = require('express')
const router = express.Router();
const { User } = require("../models/user")
const { auth } = require('../middleware/auth')
const cookieParser = require('cookie-parser')


router.get('/',(req,res)=>{
    res.send('user route test')
    
})

router.post("/signup",(req,res)=>{
    User.findOne({ email:req.body.email}, (err,user) =>{
        if(err) {
            return res.json({find_success:false, err})
        }
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

router.post("/login", (req,res)=> {
    User.findOne({ email:req.body.email},(err, user)=>{
        if(!user){
            return res.json({
                login_success:false,
                msg: "존재하지 않는 이메일 입니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if(!isMatch){
                return res.json({login_success: false,
                    msg: "비밀번호가 틀렸습니다."
                })
            }else{
                user.generateToken((err,user)=>{
                    if(err) return res.send(err)
                    res.cookie("x_auth", user.token).status(200).json({
                        login_success: true,
                        userId: user._id
                    })
                })
            }
        
        })
    })
})

router.get("/logout", auth, (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token: ""},(err,user)=>{
        if(err) return res.json({logout_success:false, err})
        return res.status(200).send({
            logout_success:true
        })
    })
})


module.exports = router