const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res)
{  try 
    {
        let post= await Post.create(
    {
    content:req.body.content,
    user: req.user._id
    });

    if(req.xhr)
    {  // returning a json 
       // console.log("xhr request");
        return res.status(200).json(
            
            {
                data:
                {
                    post:post
            },message:'post -created'

            });
    }
    req.flash('success','Post is created');
        return res.redirect('back');
} catch(err)
{
    req.flash('error',err);
    return;
}
}

module.exports.destroy= async function(req,res)
{
     try
     {
         let post=await Post.findById(req.params.id);

         if(req.xhr)
         {
             return res.status(200).json(
                 {
                     data:
                     {
                         post_id:req.params.id,
                         
                     },message:'post deleted'
                 }
             );
         }

        if(post.user==req.user.id)
        { req.flash('success','Post Deleted suceesfully');
            post.remove();
          await  Comment.deleteMany({post:req.params.id});
               return res.redirect('back');
            
        }
        else return res.redirect('back');
    } catch(err)
    {   
        req.flash('error',err);
        return;
    }

}