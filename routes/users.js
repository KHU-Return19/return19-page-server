const express = require("express")
const router = express.Router();
const { auth } = require("../middleware/auth")
const { User } = require("../models/User")
const cookieParser = require('cookie-parser')
require("dotenv").config()
router.use(cookieParser())

router.get('/',(req,res)=>{
    res.send('user route test')
    
})

router.post("/signup",(req,res)=>{
    User.findOne({ email:req.body.email}, (err,user) =>{
        if(err) {
            return res.json({findSuccess:false, err})
        }
        if(user){
            return res.json({signuSuccess:false, msg:"This email already exists"})
        }else{
            const newUser = new User(req.body)
            newUser.save((err, userInfo)=>{
                if(err) return res.json({ signupSuccess:false, err})
                return res.status(201).json({
                    signupSuccess: true,
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
                loginSuccess:false,
                msg: "This email does not exist"
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if(!isMatch)
                return res.json({loginSuccess: false,
                    msg: "Password incorrect"
                })
            
            user.generateToken((err,token)=>{
                if(err) return res.status(400).send(err)
                    
                //save token - cookie
                res.cookie(process.env.COOKIE_SECRET,token).status(200).json({
                    loginSuccess:true, token
                })

            })
            
        
        })
    })
})

router.get("/logout", auth, (req,res)=>{
    // expire refresh token
    res.clearCookie(process.env.COOKIE_SECRET).status(200).json({
        logoutSuccess:true
    })
})

router.get("/profile", auth, (req,res)=> {
    let { userId } = req.decoded
    console.log(userId)
    User.findOne({_id:userId},(err, user)=>{
        if(err) return res.json({loadProfileSuccess:false, err})
        res.status(200).json({
            loadProfileSuccess:true,
            user
        })
    })
})

router.post("/profile/update", auth, (req,res)=>{
    let { userId } = req.decoded
    let { password, birthday, bio, interest, img, url} = req.body
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
       updateUser.password = password
       updateUser.interest = interest
       updateUser.url = url
       updateUser.img = img
       updateUser.save((err, user)=>{
        if(err) return res.json({ signupSuccess:false, err})
        return res.status(201).json({
            signupSuccess: true,
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

module.exports = router