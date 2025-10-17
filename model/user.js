const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : { 
        type : String,
        enum : ['admin','user'],
        default : 'user'
    }
})

userSchema.pre('save',async function (next) {
    
    if(!this.isModified('password')) return next()

    try {
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        console.log(error.message)
        next()
    }
})

const User = mongoose.model('user',userSchema)
module.exports = User