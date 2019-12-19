const express=require('express');
const passport=require('passport');
const router=express.Router();


const post_api=require('../../../controllers/api/v1/post_api');


router.get('/',post_api.index);
router.delete('/:id',passport.authenticate('jwt',{ session:false}),post_api.destroy);


module.exports=router;