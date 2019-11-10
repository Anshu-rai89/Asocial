const express=require('express');

const router=express.Router();
const usercontoler=require('../controllers/usercontoller');

router.get('/profile',usercontoler.profile);
router.get('/post',usercontoler.post);

router.get('/signup',usercontoler.signup);
router.get('/signin',usercontoler.signin);
router.post('/create',usercontoler.create);

module.exports=router;