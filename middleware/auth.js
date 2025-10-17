const jwt = require('jsonwebtoken');
require('dotenv').config()

const userAuth = (req,res,next)=>{
    const {token} = req.cookies
    if (!token) {
      return res.redirect('/login');
    }
    
    let decode = jwt.verify(token,process.env.KEY)
    next()
}

module.exports = userAuth