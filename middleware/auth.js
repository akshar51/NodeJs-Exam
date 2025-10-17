const jwt = require('jsonwebtoken');
require('dotenv').config()

const userAuth = (req,res,next)=>{
    const {token} = req.cookies
    let decode = jwt.verify(token,process.env.KEY)
    next()
}

module.exports = userAuth