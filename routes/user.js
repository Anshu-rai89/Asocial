const express=require('express');

const passport=require('passport');

const router=express.Router();
const usercontoler=require('../controllers/usercontoller');

router.get('/profile/:id',passport.checkAuthentication,usercontoler.profile);
router.post('/update/:id',passport.checkAuthentication,usercontoler.update);
router.get('/post',usercontoler.post);

router.get('/signup',usercontoler.signup);
router.get('/signin',usercontoler.signin);
router.post('/create',usercontoler.create);
router.post('/create-session',passport.authenticate('local'
,{failureRedirect:'/user/signin'}),usercontoler.createsession);
router.get('/signout',usercontoler.signout);


module.exports=router;