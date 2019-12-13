const express=require('express');
const passport=require('../config/passport-local');

// using express route
const router=express.Router();

const postcontrooler=require('../controllers/postcontroller');


router.post('/create',passport.checkAuthentication,postcontrooler.create);

module.exports=router;