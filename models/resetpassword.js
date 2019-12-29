const mongoose=require('mongoose');



const resetPasswordSchema=new mongoose.Schema(
    {
    user:
    {
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    key:
    {
        type:String
    },
    isvalid:
    {
        type:Boolean
    }

    });

const Message=mongoose.model('Resetpassword',resetPasswordSchema);

module.exports=Message;