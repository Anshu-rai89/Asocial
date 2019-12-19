const Post=require('../../../models/post');
const Comment=require('../../../models/comment');


module.exports.index= async function(req,res)
{  
    try
    {
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

    

    return res.json(200,
        {
            message:"post created successfully",
            post:posts
        });
} catch(err)
    {
          return res.json(500,
            {
                message:"Internal server error "
            });
    }
}




module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}

