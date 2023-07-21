const express=require('express')
const router=express.Router();

const {register,login,verifyUser,logout}=require('../controller/user')

router.post('/register',register)
router.post('/login',login)
router.get('/',verifyUser,(req,res)=>{
    return res.json({email:req.email,username:req.username})
})
router.get('/logout',logout)

module.exports= router

