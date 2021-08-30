const express = require("express")
const router = express.Router();
const { auth } = require("../middleware/auth")
const { User } = require("../models/User")
const cookieParser = require('cookie-parser')
require("dotenv").config()
router.use(cookieParser())

router.get("/", (req,res)=>{
    res.send("test")
})

router.post("/signup",(req,res)=>{
    User.findOne({ email:req.body.email}, (err,user) =>{
        if(err) {
            return res.json({success:false, err})
        }
        if(user){
            return res.json({success:false, msg:"이미 존재하는 이메일입니다 :("})
        }else{
            const newUser = new User(req.body)
            newUser.save((err, userInfo)=>{
                if(err) {
                    return res.json({ success:false, err})
                }
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
                success:false,
                msg: "존재하지 않는 이메일입니다 :("
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if(!isMatch)
                return res.json({success: false,
                    msg: "비밀번호가 틀렸습니다 :("
                })
            
            user.generateToken((err,token)=>{
                if(err) return res.status(400).send(err)
                    
                //save token - cookie
                res.cookie(process.env.COOKIE_SECRET,token).status(200).json({
                    success:true, token
                })

            })
            
        
        })
    })
})

router.get("/logout", auth, (req,res)=>{
    // expire refresh token
    res.clearCookie(process.env.COOKIE_SECRET).status(200).json({
        success:true
    })
})

router.get("/profile", auth, (req,res)=> {
    let { userId } = req.decoded
    User.findOne({_id:userId},(err, user)=>{
        if(err) return res.json({success:false, err})
        res.status(200).json({
            success:true,
            user
        })
    })
})

router.put("/profile/update", auth, (req,res)=>{
    let { userId } = req.decoded
    // todo - img, password
    let {birthday, bio, interest, url} = req.body
    /*
    User.findOneAndUpdate({_id:userId}, {birthday:birthday, bio:bio, url:url, interest:interest}, (err, user)=>{
        if(err) return res.json({updateProfileSuccess:false, err})
        res.status(200).json({
            updateProfileSuccess:true
        })
    })
    */
   User.findById({_id:userId}, (err, updateUser)=>{
       updateUser.birthday = birthday
       updateUser.bio = bio
       updateUser.interest = interest
       updateUser.url = url
       updateUser.save((err, user)=>{
        if(err) return res.json({ success:false, err})
        return res.status(201).json({
            success: true,
            user
        })
    })
   })
})

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        _id: req.decoded.userId
    });
});


router.get('/members',(req,res)=>{
    User.find({}, (err, users)=>{
        if(err) res.json({
            success:flase,
            err
        })
        res.status(200).json({
            success: true,
            users
        })
    })

    
})

module.exports = router