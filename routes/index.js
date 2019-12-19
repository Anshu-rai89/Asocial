const express=require('express');

// using express route
const router=express.Router();
const homecontroler=require('../controllers/homeController');


router.get('/',homecontroler.home);

router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/api',require('./api'));

//router.use('/user_post',require('./post'));

//exporting it for other file

module.exports=router;