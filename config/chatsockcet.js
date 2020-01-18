const Message=require('../models/message');


module.exports.chatSocket=function(serverSocket)
{
    let io=require('socket.io')(serverSocket);

    io.sockets.on('connection',function(socket)
    {
        console.log('new connection recived',socket.id);
        socket.on('disconnect',function()
        {
            console.log('Connection disconnected');
        });

        socket.on('joinroom',function(data)
        {
            console.log('joining request recived',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user-joined',data);

        });


        socket.on('send_message', function(data){
            Message.findOne({id:data.chatroom},function(err,msg)
            {
                if(err){console.log('eror in finding message',err);}
                if(msg)
                {
                    // if message with id is there push the meassage in its message 

                    console.log('meesga with id found ',msg);
                    let onemsg=
                    {
                        sender:data.user_email,
                        msg:data.message
                    }

                    msg.message.push(onemsg);
                    msg.save();
                }else
                {
                    // craete it in db
                    console.log('craeting msg in db');
                    let onemsg=
                    {
                       
                        sender:data.user_email,
                        msg:data.message   
                    }
                    Message.create(
                        {
                            id:data.chatroom
                            
                        },function(err,msg)
                        {
                            if(err){console.log(err)};
                            msg.message.push(onemsg);
                            msg.save();
                        }
                    );
                }


            });
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}