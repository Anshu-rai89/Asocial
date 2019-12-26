const Post=require('../models/post');
const User =require('../models/user');
const mailer=require('../mailers/comment_mailer');

module.exports.home= async function(req,res)
{ 
    try{
        let posts= await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate(
                {
                    path:'comment',
                    populate:
                    {
                        path:'user'
                    },
                    populate:
                    {
                        path:'likes'
                    }
                }
            ).populate(
                {
                    path:'likes'
                }
            );
         
            let users=await User.find({}); 
                return res.render('home',
                    {
                    title:"Asocial | home",
                    posts:posts,
                    all_users:users
                    });
        
} catch(err)
{  console.log("Error in home controller",err);
    return res.redirect('back');
}
}