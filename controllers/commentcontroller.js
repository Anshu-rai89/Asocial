const Comment=require('../models/comment');
const Post=require('../models/post');
const commentmailer=require('../mailers/comment_mailer');
const queue=require('../config/kyu');
const commentworker=require('../workers/comment_mailerworker');
const Like=require('../models/like');

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
                   console.log('comment is creating',comment);
                   post.comment.push(comment);
                   post.save();
                   comment= await comment.populate('user','name email avatar').execPopulate();
                   if(req.xhr)
                   {
                  // comment= await comment.populate('user','name email').execPopulate();
                  // commentmailer.newComment(comment);

                  let job=queue.create('emails',comment).save((err)=>
                  {
                      if(err){console.log('error in queuing job',err);return;}
                      console.log('job enqued ',job.id);
                  });
                  

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
                  
                }

                req.flash('success', 'Comment published!');
                   res.redirect('/');
               }
            
         
    
   } catch(err)
   {     req.flash('error', err);
       console.log(err);
       return;
   }
}


// creting controller to delete comments

module.exports.destroy= async function(req,res)
{
  try
  {
    let comment= await Comment.findById(req.params.id,);
    
    let posts=await Post.findById(comment.post);
   console.log('delteing comment',comment);
    
        if((comment.user==req.user.id) ||(posts.user==req.user.id) ) 
        {
            //let commentid=comment.post;
         
            comment.remove();

          //let post= Post.findByIdAndUpdate(commentid,{$pull:{comment:comment._id}});

          posts.comment.pull(req.params.id);
          posts.save();
           
        // destroy the linked likeswith comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

             if(req.xhr)
             {
                 // send the comment id which was deleted back to views

                 return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });

             }

             req.flash('success', 'Comment deleted!');
                return res.redirect('back');
        
        }
        else  
        {  
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch(err)
    {
        req.flash('error', err);
        return;
    }
    
}