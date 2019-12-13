const express=require('express');
const passport=require('../config/passport-local');

// using express route
const router=express.Router();

const commentcontrooler=require('../controllers/commentcontroller');


router.post('/create',passport.checkAuthentication,commentcontrooler.create);
router.get('/destroy/:id',passport.checkAuthentication,commentcontrooler.destroy);

module.exports=router;