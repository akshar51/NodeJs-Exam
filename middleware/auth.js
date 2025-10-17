const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports.userAuth = (req,res,next)=>{
    const {token} = req.cookies
    let decode = jwt.verify(token,process.env.KEY)
    next()
}

module.exports.auth = (req,res,next) =>{
    const {token} = req.cookies
    if(token){
        next()
    }else{
        res.redirect('/login')
    }
}


