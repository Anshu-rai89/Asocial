const express=require('express');

// using express route
const router=express.Router();
const homecontroler=require('../controllers/homeController');


router.get('/',homecontroler.home);

router.use('/user',require('./user'));


//exporting it for other file

module.exports=router;