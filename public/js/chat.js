
var emitNewMessageCallback = null;
var requestForMoreMessages = null;
var messagesLoaded=0;



$(function() {
    console.log('document loaded');

    //make connection
    var socket = io.connect(document.URL);

    //buttons and inputs
    var username = $("#username");
    var send_username = $("#send_username");
    var username = $("#username");
    var send_message = $("#send_message");
    var message = $("#message");
    var chatroom = $("#chatroom");
    var roll = $("#chatroom");

    //listen on clear_messages
    socket.on('clear_messages', function() {
        chatroom.empty();
    });

    //listen on new new_message
    socket.on('new_message', function(data) {
        console.log(data)
        messagesLoaded += 1;
        console.log("messagesLoaded: " + messagesLoaded);
        let text =  data.message.text;
        let username = data.message.username;
        let date = moment(data.message.date).fromNow();

        control = 
                        '<div class="direct-chat-info clearfix">' +
                            '<span class="direct-chat-name float-left"><small>'+username+'</small></span>' +
                            '<span class="direct-chat-timestamp float-right"><small>'+date+'</small></span>' +
                        '</div>' +
                        '<div class="direct-chat-text">' +
                            text +
                        '</div><br/>';
        chatroom.prepend(control)
    });

    //listen on old old_message
    socket.on('old_message', function(data) {
        console.log(data)
        messagesLoaded += 1;
        console.log("messagesLoaded: " + messagesLoaded);
        let text =  data.message.text;
        let username = data.message.username;
        let date = moment(data.message.date).fromNow();

        control = 
                        '<div class="direct-chat-info clearfix">' +
                            '<span class="direct-chat-name float-left"><small>'+username+'</small></span>' +
                            '<span class="direct-chat-timestamp float-right"><small>'+date+'</small></span>' +
                        '</div>' +
                        '<div class="direct-chat-text">' +
                            text +
                        '</div><br/>';
        chatroom.append(control)
    });
    
    //emit username
    send_username.click(function() {
        console.log(username.val());
        socket.emit('change_username', {username: username.val()});
    });
    
    //emit message
    send_message.click(function() {
        console.log(message.val());
        socket.emit('new_message', {message: message.val()});
    });

    emitNewMessageCallback = function(messageString) {
        console.log("emiting new message: " + messageString);
        socket.emit('new_message', {message: messageString});
    }
    requestForMoreMessages = function() {
        console.log("requesting for more messages ");
        socket.emit('more_messages_request', {messagesLoaded: messagesLoaded});
    }

    $("#myscrollable").scroll(GetScrollerEndPoint);
});



function GetScrollerEndPoint()
{
    console.log("onscroll")
    var scrollHeight = $("#myscrollable").prop('scrollHeight');
    var divHeight = $("#myscrollable").height();
    var scrollerEndPoint = scrollHeight - divHeight;

    var divScrollerTop =  $("#myscrollable").scrollTop();
    if(divScrollerTop === scrollerEndPoint)
    {
        console.log("scroll end")
        if (requestForMoreMessages)
            requestForMoreMessages();
    }
}
  