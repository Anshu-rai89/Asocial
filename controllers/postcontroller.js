const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const fs=require('fs');
const path=require('path');

module.exports.create= async function(req,res)
{  try 
    {
       
        var posts;
        var postfiles;
        var content_info;
        var user_info;                
        let upload=await Post.uploadPostFile(req,res,function(err)
              {  
                  if(err){console.log(err);return;}
                  content_info=req.body.content;
                  console.log('content is ',content_info);
                  user_info=req.user._id;
                 
          
                  if(req.file)
                  {  console.log('in req file');
                      postfiles=Post.postfilepath+'/'+req.file.filename;
                    
                  }
                  Post.create(
                    {

                        content:content_info,
                        user:user_info,
                        Postfile:postfiles
                    },function(err,post)
                    {
                        if(err){console.log(err);return;}
                        console.log('succesfully added post',post);
                        posts=post;

                    }
                );

                });

        if(req.xhr)
        {  // returning a json 
                console.log("xhr request");
             

            //populating only nameof user 
             posts = await posts.populate('user', 'name').execPopulate();
                return res.status(200).json(
                    
                    {
                        data:
                        {
                            post:posts
                    },message:'post a-created'

                    });
            }
                       
                      
                  
                 
           

                req.flash('success','Post is created');
                    return res.redirect('back');
        } catch(err)
    {
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.destroy= async function(req,res)
{
     try
     {
         let post=await Post.findById(req.params.id);


         if(post.user==req.user.id)
         {
               // CHANGE :: delete the associated likes for the post and all its comments' likes too
                await Like.deleteMany({likeable: post, onModel: 'Post'});
                await Like.deleteMany({_id: {$in: post.comment}});
               if(post.Postfile){ fs.unlinkSync(path.join(__dirname,'..',post.Postfile));}
                post.remove();
                await  Comment.deleteMany({post:req.params.id});

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
         req.flash('success', 'Post and associated comments deleted!');

         return res.redirect('back');
            
        }
        else return res.redirect('back');
    } catch(err)
    {   
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }

}