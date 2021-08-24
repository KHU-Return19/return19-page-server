const jwt = require("jsonwebtoken")

let auth = (req, res, next) =>{
    let token = req.header("x-auth-token")

    if(!token) return res.status(400).json({verifyToken:false,
    msg:"No token, authorization denied"})
    else{
        let decoded = jwt.verify(token, process.env.JWTSECRET, (err, decoded)=>{
            if(err) return res.status(400).json({verifyToken:false})
            req.decoded = decoded
            next()
        })
    }
}

module.exports = { auth };