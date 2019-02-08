$(function() {
    console.log('document loaded');

    //make connection
    var socket = io.connect('http://localhost:3000');

    //buttons and inputs
    var username = $("#username");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var roll = $("#chatroom");

    //listen on clear_messages
    socket.on('clear_messages', function() {
        chatroom.empty();
    });

    //listen on new new_message
    socket.on('new_message', function(data) {
        chatroom.prepend("<p id='content'>" + data.full_message + "</p>");
        chatroom.animate({
            //scrollTop: $("#chatroom")[0].scrollHeight
            scrollTop: 1000000
        }, 0);
    });
    
    //emit username
    send_username.click(function() {
        console.log(username.val());
        socket.emit('change_username', {username: username.val()});
    });

    emitNewMessageCallback = function(messageString) {
        console.log("emiting new message: " + messageString);
        socket.emit('new_message', {message: messageString});
    }
});

var emitNewMessageCallback = null;