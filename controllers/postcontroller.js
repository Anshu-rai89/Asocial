const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

module.exports.create= async function(req,res)
{  try 
    {
        console.log(req.body.content);
      
       
    
        // if(req.file)
        //     {
        //         console.log('detected a file');
        //         postfile=Post.postfilepath + '/' +req.file.filename;
        
        //     }
        

        Post.uploadedPostFile(req,res,function(err)
        {  if(err){console.log("Error in using multer in post",err);return;}
            let content= req.body.content;
            let user=  req.user._id;
            let postfile;
            if(req.file)
            {
                console.log('detected a file');
               postfile=Post.postfilepath + '/' +req.file.filename;
               console.log(postfile);
            }
             post=  Post.create(
                {
                    content:content,
                    user:user,
                    Postfile:postfile
                  
            
                },function(err,post)
                {
                    if(err){console.log(err);return res.redirect(back);}
                });
            });
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
        post = await post.populate('user', 'name').execPopulate();
        return res.status(200).json(
            
            {
                data:
                {
                    post:post
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