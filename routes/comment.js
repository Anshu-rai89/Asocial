const express=require('express');
const passport=require('../config/passport-local');

// using express route
const router=express.Router();

const commentcontrooler=require('../controllers/comment');


router.post('/create',passport.checkAuthentication,commentcontrooler.create);

module.exports=router;