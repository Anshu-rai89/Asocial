const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');



module.exports.toggled_like= async function(req,res)
{   
    let likeable;                   // var to store type of incmomimg route
    let delete_var=false;           // var to keeptrack of of toogle to update count on like
    
    // route type /like/toggle/id&type=


    if(req.query.type=='Post')
        {   // if its of type post then find it by post
            likeable= await Post.findById(req.query.id).populate('Like');
        } ekse
        {    // else find it by comment
            likeable= await Comment.findById(req.query.id).populate('Like');
        }

     // check if that like exist in db or not 

    let existinglike=await Like.findOne({
        likeable:req.query.id,
        onModel:req.query.type,
        user:req.user._id
    });


    // if like exits delete it
    
      if(existinglike)
      {
          likeable.likes.pull(existinglike._id);
          likeable.save();
          existinglike.remove();
          delete_var=true;
      }else
      {
          // if not present creat  it 

           let newlike= await Like.create(
               {
                   user:req.user._id,
                   likeable:req.query.id,
                   onModel:req.query.type

               }
           );
           likeable.likes.push(newlike._id);
           likeable.save();
      }

      return res.json(200,
        {
            message:"Request Successfull",
            data:
            {
                delete_var=delete_var
            }
        });
}