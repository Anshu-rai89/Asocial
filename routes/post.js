const express=require('express');

// using express route
const router=express.Router();

const postcontrooler=require('../controllers/postcontroller');


router.post('/create',postcontrooler.create);

module.exports=router;