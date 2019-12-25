const express=require('express');

// using express route
const router=express.Router();

const freindController=require('../controllers/freindshipcontroller');



router.get('/add',freindController.add);





module.exports=router;