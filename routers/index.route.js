const { Router } = require("express");
const Ctl = require('../controller/index'); 
const userAuth = require("../middleware/auth");
const router = Router()

router.get('/',Ctl.homePage)
router.get('/register',Ctl.registerPage)
router.get('/login',Ctl.loginPage)
router.get('/myArticle',Ctl.MyArticle)
router.get('/viewArticle',Ctl.viewArticle)

router.post('/register',Ctl.register)
router.post('/login',Ctl.login)
router.post('/myArticle',Ctl.article)

router.get('/delete/:id',Ctl.deleteArticle)

module.exports = router