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

   // searching if the other person has already aed you tolist

   let otherfreind=await Freind.findOne(
       { from_user:req.query.id,
        to_name:fromuser.name,
     
        to_user:userid,
       }
   );
  console.log('checking alrready freind fromother',otherfreind);
   if(otherfreind) 
   {   console.log('your freind found');

            let friend={
                name:touser.name,
                id:`${otherfreind._id}`
            }
            console.log('adding freind ',friend);
            fromuser.friendships.push(friend);
            fromuser.save();
        
            console.log(fromuser.friendships);
   }


   else

   {
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
          let friend={
              name:freindship.to_name,
              id:`${freindship._id}`
          }
           fromuser.friendships.push(friend);
           //console.log("updated freind ",user.freindships);
           fromuser.save();
        
      
        }
    }

        return res.redirect('/');

    }catch(err)
    {
        console.log("error in creating freindship",err);
        return res.redirect('back');
    }
    
}