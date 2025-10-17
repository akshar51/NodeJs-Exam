const { Router } = require("express");
const Ctl = require('../controller/index'); 
const { userAuth, auth } = require("../middleware/auth");
const router = Router()

router.get('/',auth,Ctl.homePage)
router.get('/register',Ctl.registerPage)
router.get('/login',Ctl.loginPage)
router.post('/register',Ctl.register)
router.post('/login',Ctl.login)


router.get('/myArticle',userAuth,Ctl.MyArticle)
router.get('/viewArticle',userAuth,Ctl.viewArticle)
router.get('/delete/:id',userAuth,Ctl.deleteArticle)

router.post('/myArticle',userAuth,Ctl.article)
router.get('/edit/:id',userAuth,Ctl.editArticle)
router.post('/update/:id',userAuth,Ctl.updateArticle)

module.exports = router