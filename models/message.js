const mongoose=require('mongoose');


const messageSchema=new mongoose.Schema(
    {
        id:
        {
            type:String,
            required:true
        },
        message:
        [
            {
                type:Object
            }
        ]
       
    }
);

const Message=mongoose.model('Message',messageSchema);

module.exports=Message;