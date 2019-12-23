const express=require('express');

// using express route
const router=express.Router();

const likeController=require('../controllers/likecontroller');




router.post('/toggle',likeController.toggled_like);








module.exports=router;