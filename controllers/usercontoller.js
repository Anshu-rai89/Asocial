const User=require('../models/user');

module.exports.profile=function(req,res)
{
    res.render('user',{title:"user"});
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

