class ChatEngine
{
    constructor(chatBoxId,userEmail,chatRoom)
    {
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.chatRoom=chatRoom;
        this.socket=io.connect('http://3.81.51.218:5000');

        if(this.userEmail)
        {
             this.connetionHandler();
        }
    }

    connetionHandler()
    {  let self=this;
      
        this.socket.on('connect',function()
        {
            console.log('connection established using sockets');
            self.socket.emit('joinroom',
            {
                user_email:self.userEmail,
              
                chatroom:`${self.chatRoom}` 
            });


            self.socket.on('user-joined',function(data)
            {
              //  console.log('a user joined',data);
            })
        });

        // handling enter key press
        $("#chat-message-input").keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            //alert(code);
            if (code == 13) {
                $("#send-message").trigger('click');
            }
        });


        $('#send-message').click(function(){
           // console.log('send is cliked');
            let msg = $('#chat-message-input').val();
            $('#chat-message-input').text('');
            //console.log(msg);

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: `${self.chatRoom}`
                });
            }
        });

        self.socket.on('receive_message', function(data){

            let newMessage = $('<li>');

            let messageType ='other-message'

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

           
            newMessage.append($('<div>', {                
                'html': data.message
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
            setTimeout(()=>{
                document.getElementById('chat-message-input').value = '';
                var chatlist = document.getElementById('chat-messages-list');
		        chatlist.scrollBy(0, chatlist.scrollHeight);
            }, 60)
        });
    }
    }

