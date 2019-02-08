var socket = require('socket.io');
var Message = require('./models/message');


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
          socket.username = data.username;
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

          io.sockets.emit('new_message', {full_message: message.full_message});

          message.save(function(err) {
            if(err) { return; }
            console.log('saved message: ' + message.full_message);
          })
        });

        //send all previous messages
        Message.find()
          .sort({'date': -1})
          .limit(5)
          .exec(function(err, messageHistory) {
            socket.emit('clear_messages');
            for(let i=messageHistory.length-1; i>=0 ; i--) {
              let singleMessage = messageHistory[i];
              socket.emit('new_message', {full_message: singleMessage.full_message});
            }
          });

      };
}


  module.exports = mysockets;