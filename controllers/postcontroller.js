const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const fs=require('fs');
const path=require('path');

module.exports.create= async function(req,res)
{  try 
    {
        //console.log(req.file);
      
       
    
        // if(req.file)
        //     {
        //         console.log('detected a file');
        //         postfile=Post.postfilepath + '/' +req.file.filename;
        
        //     }
            var posts;
            var content_info;
            var user_info;
            var postfile;
            let upload=await Post.uploadPostFile(req,res,function(err)
                    {   console.log('in postcontroler',req.file);
                        if(err){console.log(err);return;}
                        content_info=req.body.content;
                        user_info=req.user._id;
                       
                        if(req.file)
                        {  
                            postfile=Post.postfilepath+'/'+req.file.filename;
                        }

                        Post.create(
                            {

                                content:content_info,
                                user:user_info,
                                Postfile:postfile
                            },function(err,post)
                            {
                                if(err){console.log(err);return;}
                                console.log('succesfully added post',post);
                                posts=post;

                            }
                        )
                    });

            console.log(postfile);
            console.log('creating post');
            // let post= await Post.create(
            //     {  
            //         content:content_info,
            //         user:user_info,
            //         Postfile:postfile
                  
            
            //     });
        // });
    //   //  console.log(postfile);
    //     let post= await Post.create(
    //         {
    //             content:req.body.content,
    //             user: req.user._id,
    //             Postfile:Post.postfilepath + '/' +req.file.filename
            

    //         });

    if(req.xhr)
    {  // returning a json 
       // console.log("xhr request");

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
                fs.unlinkSync(path.join(__dirname,'..',post.Postfile));
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