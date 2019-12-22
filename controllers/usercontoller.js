const User=require('../models/user');
const fs=require('fs');
const path=require('path');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

module.exports.update= async function(req,res)
{
    if(req.user.id == req.params.id){
       
       try{

         let user= await   User.findById(req.params.id);

         User.uploadedAvatar(req,res,function(err)
         {
             if(err){console.log("****Error in multer**",err);return;}

             user.name=req.body.name;
             user.email=req.body.email;

             if(req.file)
             {   // if user want to change old profile pic
                 if(user.avatar)
                 {
                      fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                 }
                
                // saving the ulodeded file path to avtar filed in user schema
                 user.avatar=User.avatarpath + '/' +req.file.filename;
             }

             user.save();
             return res.redirect('back');
         });
                
           
        }catch(err)
        {
            req.flash("error",err);
            res.redirect('back');
        }



    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


module.exports.signin=function(req,res)
{ if(req.isAuthenticated())  return res.redirect('back');
    res.render('signin',
    {
        title:"sign in"
    });
}

module.exports.signup=function(req,res)
{  if(req.isAuthenticated())  return res.redirect('back');
    res.render('signup',
    {
        title:"sign Up"
    });
}

module.exports.post=function(req,res)
{
    res.render('post',{title:"post"});
}

// get the sign up data
module.exports.create = async function(req, res){
   try{

    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

  let user=  User.findOne({email: req.body.email});

        if (!user){
           let newuser= User.create(req.body);

                return res.redirect('/user/signin');
            }
        else{
            return res.redirect('back');
        }
    }catch(err)
    {
        console.log('ERror');
        return;
    }
    
}

module.exports.createsession = function(req,res)
{  req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.signout=function(req,res)
{  req.flash('success','You are Logged Out');
    req.logout();
    return res.redirect('/');
}




