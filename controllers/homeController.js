const Post=require('../models/post');
const User =require('../models/user');


module.exports.home= async function(req,res)
{ 
    try{
        myusers=[];
        myusers.push(req.user._id);
        for( f of req.user.friendships)
        {
            myusers.push(f._id);
        }
        console.log(myusers);

        let posts= await Post.find({user:{ $in:myusers}})

            .sort('-createdAt')
            .reverse()
            .populate('user')
            .populate(
                {
                    path:'comment',
                    populate:
                    {
                        path:'likes'
                    },
                    populate:
                    {
                        path:'user'
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