const User=require('../../../models/user');

const jwt=require('jsonwebtoken');


module.exports.createsession = async function(req,res)
{  
    // finding the user 
   try{
    let user= await User.findOne({email:req.body.email});

    if(!user || user.password!=req.body.password)
    {
        return res.json(422,
            {
                message:" invalid user "
            });
    }


    return res.json(200,
        {
           message:'Sign in find your token and keep it safe ',
           data:
           {
               token:jwt.sign(user.toJSON(),'Asocial',{expiresIn:'1000000'})
           }
        });
} catch(err)
    {
         return res.json(500,
            {
                messgae:"internal server error "
            });
    }

}