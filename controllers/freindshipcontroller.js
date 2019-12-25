const Freind=require('../models/freindship');
const User=require('../models/user');




module.exports.add=async function(req,res)
{
    // find the existingfreindship
try{
  //  console.log(req);

    let userid=req.query.name;
   // console.log(user);
    let fromuser=await User.findById(userid);
    let touser = await User.findById(req.query.id);
    //console.log(user.name);
   // console.log(user.friendships);
    let existingfreindship= await Freind.findOne(
        {
            from_user:userid,
            to_name:touser.name,
         
            to_user:req.query.id,
           
        });
    console.log('checking ',existingfreindship);
        if(!existingfreindship)
        {
            // create it 
              console.log('creatin freindship');
            let freindship=await Freind.create(
                {    to_name:touser.name,
                    from_user:userid,
                    to_user:req.query.id,
                   
                });
          
           fromuser.friendships.push(freindship.to_name);
           //console.log("updated freind ",user.freindships);
           fromuser.save();
        
      
        }

        return res.redirect('/');

    }catch(err)
    {
        console.log("error in creating freindship",err);
        return res.redirect('back');
    }
    
}