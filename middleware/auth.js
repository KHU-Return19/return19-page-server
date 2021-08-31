const jwt = require("jsonwebtoken")

let auth = (req, res, next) =>{
    //let token = req.header("x-auth-token")
    // HTTP ONLY COOKIE
    let token = req.cookies[process.env.COOKIE_SECRET]
    if(!token) return res.json({isAuth:false})
    let decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) res.clearCookie(process.env.COOKIE_SECRET).json({
                isAuth: false
            })
            else{
                req.decoded = decoded
                next()
            }
            
    })
    
}

module.exports = { auth };