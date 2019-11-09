const express=require('express');

const router=express.Router();
const usercontoler=require('../controllers/usercontoller');

router.get('/profile',usercontoler.profile);
router.use('/post',require('./post'));


module.exports=router;