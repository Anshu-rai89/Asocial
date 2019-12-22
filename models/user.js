const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avtars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },avatar:
    {
        type:String
    }
}, {
    timestamps: true
});

// linking our destination path using multer

let storage=multer.diskStorage(
    {
        destination:function(req,file,cb)
        {
            cb(null,path.join(__dirname,'..',AVATAR_PATH));
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname+'-'+Date.now());
        }
    }
);

// static to make them available for others
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarpath=AVATAR_PATH;


const User = mongoose.model('User', userSchema);

module.exports = User;