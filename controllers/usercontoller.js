const User=require('../models/user');

module.exports.profile=function(req,res)
{
    res.render('user',{title:" To Asocial "});
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




