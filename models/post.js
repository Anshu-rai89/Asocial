const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const PostFile_PATH=path.join('/uploads/users/posts');



const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    comment:[
    {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Comment'

    }
],
likes:[
    {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Like'
    }
],
Postfile:
{
    type:String
}
},{
    timestamps: true
});


let storage=multer.diskStorage(
    {
        destination:function(req,file,cb)
        {
            cb(null,path.join(__dirname,'..',PostFile_PATH));
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname+'-'+Date.now());
        }
    }
);

// static to make them available for others
postSchema.statics.uploadedPostFile=multer({storage:storage}).single('Post-file');
postSchema.statics.postfilepath=PostFile_PATH;
const Post = mongoose.model('Post', postSchema);
module.exports = Post;