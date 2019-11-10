const express=require('express');

const router=express.Router();
const usercontoler=require('../controllers/usercontoller');

router.get('/profile',usercontoler.profile);
router.get('/post',usercontoler.post);

router.get('/signup',usercontoler.signup);
router.get('/signin',usercontoler.signin);
router.post('/create',usercontoler.create);
router.post('/create-session',usercontoler.createsession);
router.post('/signout',usercontoler.signout);

module.exports=router;