const { User } = require("../models/user");

let auth = (req, res, next) =>{
    const token = req.header("x-auth-token")
    if(!token) return res.status(400).json({get_token_success:false,
    msg:"No token, authorization denied"})
    else{
        User.findByToken(token, (err, user)=>{
            if(err) throw err;
            if(!user) return res.json({ auth_success:false})
            req.token = token;
            req.user = user;
            next()
        })
    }
}

module.exports = { auth };