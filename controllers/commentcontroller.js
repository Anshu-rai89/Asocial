const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res)
{
   Post.findById(req.body.post,function(err,post)
   {
       if(err) { console.log("Error in finding Post");  return;}

       if(post)
       {
           Comment.create(
               {
                  content:req.body.content,
                  post:req.body.post,
                  user:req.user._id 
               },function(err,comment)
               {
                   if(err)  {console.log("Error in creating a comment"); return;}

                   post.comment.push(comment);
                   post.save();
                   res.redirect('/');
               }
           );
       }
   });
}


// creting controller to delete comments

module.exports.destroy=function(req,res)
{
    Comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user==req.user.id)
        {
            let commentid=req.post;
            comment.remove();

            Post.findByIdAndUpdate(commentid,{$pull:{comment:req.params.id}},function(err,post)
            {
                return res.redirect('back');
            });
        }
        else  return res.redirect('back');
    });
}