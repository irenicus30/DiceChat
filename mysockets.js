var socket = require('socket.io');
var Message = require('./models/message');
const messageChunk = 7;


function mysockets(server) {
    var io = socket(server);
    io.on('connection', onConnection);
    var app = null;

    function onConnection(socket) {
        console.log('New user connected');
      
        //default username
        socket.username = 'anonymous';
      
        //listen on change_username
        socket.on('change_username', function(data) {
          if( data.username )
            socket.username = data.username;
          else
            socket.username = "anonymous"
        });
      
        //listen on new_message
        socket.on('new_message', function(data) {
          //broadcast new message
          var currentDate = new Date();

          var message = new Message({
            username: socket.username,
            text: data.message,
            date: currentDate
          });

          io.sockets.emit('new_message', {message: message});

          message.save(function(err) {
            if(err) { return; }
            console.log('saved message: ' + message.full_message);
          })
        });
        socket.on('more_messages_request', function(data) {
          var messagesLoaded = data.messagesLoaded;
          //send next chunk of messages
          Message.find()
            .sort({'date': -1})
            .skip(messagesLoaded)
            .limit(messageChunk)
            .exec(function(err, messageHistory) {
              for(let i=messageHistory.length-1; i>=0 ; i--) {
                let singleMessage = messageHistory[i];
                socket.emit('old_message', {message: singleMessage});
              }
            });

        });

        //send all previous messages
        Message.find()
          .sort({'date': -1})
          .limit(2*messageChunk)
          .exec(function(err, messageHistory) {
            socket.emit('clear_messages');
            for(let i=messageHistory.length-1; i>=0 ; i--) {
              let singleMessage = messageHistory[i];
              socket.emit('new_message', {message: singleMessage});
            }
          });

      };
      
}
    

module.exports = mysockets;