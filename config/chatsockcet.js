

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
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}