const express=require('express');

const passport=require('passport');

const router=express.Router();
const usercontoler=require('../controllers/usercontoller');

router.get('/profile/:id',passport.checkAuthentication,usercontoler.profile);
router.get('/profile-freind',passport.checkAuthentication,usercontoler.freindprofile);
router.post('/update/:id',passport.checkAuthentication,usercontoler.update);
router.post('/search',passport.checkAuthentication,usercontoler.search);
router.get('/post',usercontoler.post);

router.get('/signup',usercontoler.signup);
router.get('/signin',usercontoler.signin);
router.post('/create',usercontoler.create);
router.post('/create-session',passport.authenticate('local'
,{failureRedirect:'/user/signin'}),usercontoler.createsession);
router.get('/signout',usercontoler.signout);
router.get('/resetpassword/page',usercontoler.resetpasswordpage);
router.post('/resetpassword/email',usercontoler.resetPasswordMail);
router.get('/resetpassword/update',usercontoler.resetPasswodUpdatePage);
router.post('/resetPassword',usercontoler.resetPassword);

// router for google auth

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),usercontoler.createsession);


module.exports=router;