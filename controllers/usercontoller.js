const User=require('../models/user');

module.exports.profile=function(req,res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user)
        {
             if(user)
             {
                 return res.render('user',
                 {
                     title:"profile",
                     user:user
                 });
             }
             return res.redirect('/user/signin');

        });
    }

    else  return res.redirect('/user/signin');
}


module.exports.signin=function(req,res)
{
    res.render('signin',
    {
        title:"sign in"
    });
}

module.exports.signup=function(req,res)
{
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
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/user/signin');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createsession=function(req,res)
{
       // find the user with id
       
       User.findOne({email:req.body.email},function(err,user)
       {
        if(err){console.log('error in finding user in signing up'); return}
          
        //handle user found 

        if(user)
        {
             // password dosnt matched
             if(user.password!=req.body.password)
             {
                 return res.redirect('back');
             }

             res.cookie('user_id',user.id);
             return res.redirect('/user/profile');
        }

        else{
             // handleuser not found 
             return res.redirect('back');
        }
       });

       

       // handleuser not found 
}


module.exports.signout=function(req,res)
{
    req.cookies.user_id="";
    return res.redirect('/user/profile');
}
