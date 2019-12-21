const Comment=require('../models/comment');
const Post=require('../models/post');
const commentmailer=require('../mailers/comment_mailer');
const queue=require('../config/kyu');
const commentworker=require('../workers/comment_mailerworker');

module.exports.create=async function(req,res)
{  try{
   let post=await Post.findById(req.body.post);

       if(post)
       {
         let comment= await  Comment.create(
               {
                  content:req.body.content,
                  post:req.body.post,
                  user:req.user._id 
               });
                   console.log(comment);
                   post.comment.push(comment);
                   post.save();
                   comment= await comment.populate('user','name email').execPopulate();
                  // commentmailer.newComment(comment);

                  let job=queue.create('emails',comment).save((err)=>
                  {
                      if(err){console.log('error in queuing job',err);return;}
                      console.log('job enqued ',job.id);
                  });
                   res.redirect('/');
               }
         
    
   } catch(err)
   {
       console.log("Error");
       return;
   }
}


// creting controller to delete comments

module.exports.destroy= async function(req,res)
{
  try
  {
    let comment= await Comment.findById(req.params.id,);
    
        if(comment.user==req.user.id)
        {
            let commentid=req.post;
            comment.remove();

          let post= Post.findByIdAndUpdate(commentid,{$pull:{comment:req.params.id}});
           
                return res.redirect('back');
        
        }
        else  return res.redirect('back');
    } catch(err)
    {
        console.log("Error");
        return;
    }
    
}