const Post=require('../models/post');
const User =require('../models/user');

module.exports.home= async function(req,res)
{ 
    try{
        let posts= await Post.find({}).populate('user')
            .populate(
                {
                    path:'comment',
                    populate:
                    {
                        path:'user'
                    }
                }
            );

            let users= await User.find({});
                return res.render('home',
                    {
                    title:"Asocial | home",
                    posts:posts,
                    all_users:users
                    });
        
} catch(err)
{
    return res.flash('error',err);
}
}