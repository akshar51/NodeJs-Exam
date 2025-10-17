const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const db = require('./config/db')

const port = process.env.PORT || 4000
const app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/',require('./routers/index.route'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log("Server started...")
        console.log("http://localhost:"+port)
    }
})
