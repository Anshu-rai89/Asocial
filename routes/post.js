const express=require('express');

const router=express.Router();
const postcontoller=require('../controllers/postcontroller');

router.get('/post',postcontoller.post);

module.exports=router;