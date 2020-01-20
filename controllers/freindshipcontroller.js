const Freind=require('../models/freindship');
const User=require('../models/user');
const queue=require('../config/kyu');
const Message=require('../models/message');
const removefreindworker=require('../workers/removefreind_worker');
const confirmfreindworker=require('../workers/confirmfreindmail_worker');




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
                id:`${otherfreind._id}`,
                _id:touser._id,
                avatar:touser.avatar
            }
          
            fromuser.friendships.push(friend);
           // console.log('adding freind', friend,'in ',fromuser.name);
            //fromuser.save();

           // var otherfreind=
             //console.log('other freindis ',freind2);
           touser.friendships.push({
            name:fromuser.name,
            id:`${otherfreind._id}`,
            _id:fromuser._id,
            avatar:fromuser.avatar
        });
            
            touser.save();
             let removerequest={
                 _id:fromuser._id,
                 name:fromuser.name,
                 avatar:fromuser.avatar,
                 id:`${otherfreind._id}`,
             }
          //   console.log('removing ',removerequest,'from',fromuser.name);
            fromuser.request.splice(fromuser.request.indexOf(removerequest),1);
            fromuser.save();
         
           // console.log(fromuser.friendships);
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

                // send a freind request 
                let request={
                    _id:fromuser._id,
                    name:fromuser.name,
                    avatar:fromuser.avatar,
                    id:freindship._id
                }

                touser.request.push(request);
                touser.save();
         console.log('pushing request from ',touser,'request to ',request);
                req.flash('success','Freind Request Send');
          
        // push a job for worker to send confirm mail to to_user
        // we will be sending a object with fromuser name and to_user name and email id 

        // making a object to send to kue confirmfreind queue
        let details={
            from_user_name:fromuser.name,
            to_user_name:touser.name,
            to_user_email:touser.email,
            from_user_email:fromuser.email,
            user_avatar:fromuser.avatar
        }

        let job= queue.create('confirm-freind',details).save((err)=>
        {
            if(err){console.log('error in queuing job',err);return;}
            console.log('job enqued ',job.id);
        });
 
      
        }
    }

   

        return res.redirect('/');

    }catch(err)
    {
        console.log("error in creating freindship",err);
        return res.redirect('back');
    }
    
}

module.exports.freindprofile=async function(req,res)
{   try
    {  
      let user=await User.findById(req.query.type);
      console.log(user);

      // finding the messages of the user from db
      let messages=await Message.findOne({id:req.query.id});
      return res.render('freinds',{
           title:'User Profile',
           profile_user:user,
           id:req.query.id,
           msgs:messages
      });
    }catch(err)
    {
        console.log('error in finding profile',err);
        return res.redirect('back');
    }


}


// function to remove freind
module.exports.removeFreind=async function(req,res)
{
  try{
    // find the user by email
    // get user id and freind id from route
    console.log(req.query.id);
    let freindship=await Freind.findById(req.query.id);

    // deleting the associated chat with user
    let msg=Message.findById(freindship._id);
    msg.remove();

    // find the user whois freind 
 //   console.log('freind details',freindship);

    let user= await User.findById(req.query.type);
  //  console.log('user from which freind ',user);
        var freindname;
        var freindemail;

        // if currunt user sends the request freind db has currunt user freind id 
        if(user.name!=freindship.to_name)
        {
            freindname=freindship.to_name;
            // finding the other user whoes isfreind of currunt user

            let otheruser=await User.findById(freindship.to_user);
            freindemail=otheruser.email;
                // removing currunt user from otheruser freindship list  
                let removeuser=
                {
                    name:user.name,
                    id:req.query.id
                }
               console.log('removing user',removeuser);
            console.log(' from',otheruser.name);
            console.log(otheruser.friendships.indexOf(removeuser));
            otheruser.friendships.splice(otheruser.friendships.indexOf(removeuser), 1);
            otheruser.save();
            
        }

        // if other user have send setails then currunt user have used others user freind id 
        else{
            let freinduser=await User.findById(freindship.from_user);
            freindname=freinduser.name;
            freindemail=freinduser.email;
             // removing currunt user from otheruser freindship list  
             let removeuser=
             {
                 name:user.name,
                 id:req.query.id
             }
           console.log('removing user',removeuser);
            console.log(' from',freinduser.name)
            console.log(freinduser.friendships.indexOf(removeuser));
             freinduser.friendships.splice(freinduser.friendships.indexOf(removeuser), 1);
             freinduser.save();
             
        }

            console.log('freind name',freindname);
        freindship.remove();
        let removeuser=
        {
            id:req.query.id,
            name:freindname
        }
         let removerequest={
            
             name:freindname,
            
             id:req.query.id
         }
        user.request.splice(user.request.indexOf(removerequest),1);
       
    // removing the following user from freindship array
    console.log(user.friendships.indexOf(removeuser));
        user.friendships.splice( user.friendships.indexOf(removeuser), 1 );
        user.save();

    // queuing job for sending unfreind mail
    // sending reuired details by one object

    let details=
    {
        from_user:user.name,
        to_user_name:freindname,
        to_user_email:freindemail,
        user_avatar:user.avatar
    }
    let job=queue.create('remove-freind',details).save((err)=>
    {
        if(err){console.log('error in queuing job',err);return;}
        console.log('job enqued ',job.id);
    });
   
    req.flash('success','User removed from your FriendList');
    return res.redirect('/');
    }catch(err)
        {
            console.log('error in removing freind',err);
            return res.redirect('back');
        }
}