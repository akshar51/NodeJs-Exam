const User = require("../model/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Article = require("../model/article")
require('dotenv').config()

exports.loginPage = (req,res)=>{
    res.render('./pages/login')
}

exports.dashPage = (req,res)=>{
    res.render('./pages/index')
}

exports.registerPage = (req,res)=>{
    res.render('./pages/register')
}

exports.homePage = (req,res)=>{
    res.render('./pages/index')
}

exports.MyArticle = (req,res)=>{
    res.render('./pages/myArticle')
}

exports.register = async (req,res)=>{
    try {
        console.log(req.body)
        await User.create(req.body)
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer') || '/')
    }
}


exports.login = async (req,res)=>{
    try {
        const {username,password} = req.body
        let user = await User.findOne({username})
        
        if(user){
            let isValid = await bcrypt.compare(password,user.password)

            if (isValid) {
                let payload = {
                    id : user.id,
                    role : user.role
                }

                let token = jwt.sign(payload ,process.env.KEY )
                res.cookie('token',token)

                if(user.role == 'admin'){
                    res.redirect('/')
                }else{
                    res.redirect('/viewArticle')
                }

            } else {
                res.redirect(req.get('Referrer') || '/')
            }
        }else{
                res.redirect(req.get('Referrer') || '/')
        }    
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

// Article

exports.article = async (req,res)=>{
    try {
        await Article.create(req.body)
        res.redirect(req.get('Referrer') || '/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer') || '/')
    }
}

exports.viewArticle = async (req,res)=>{
    try {
        let article = await Article.find({})
        res.render('./pages/viewArticle',{article})
    } catch (error) {
        console.log(error.message)
        res.render('./pages/viewArticle',{article : []})
    }
}

exports.deleteArticle = async (req,res)=>{
    try {
        let {id} = req.params
        await Article.findByIdAndDelete(id)
        res.redirect(req.get('Referrer')|| '/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')|| '/')
    }
}

exports.editArticle = async (req,res)=>{
    try {
        let {id} = req.params
        let article = await Article.findById(id)
        res.render('./pages/editArticle',{article})
    } catch (error) {
        console.log(error.message)
        res.render('./pages/editArticle',{article:[]})
    }
}

exports.updateArticle = async (req,res)=>{
    try {
        let {id} = req.params
        await Article.findByIdAndUpdate(id,req.body,{new:true})
        res.redirect('/viewArticle')
    } catch (error) {
        console.log(error.message)
        res.redirect('/viewArticle')
    }
}