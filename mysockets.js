var socket = require('socket.io');
var mongoose = require('mongoose');
var Message = require('./models/message');

mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db opened');
});



function mysockets(server) {
    var io = socket(server);
    io.on('connection', onConnection);



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
            authenticated: false,
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
          .exec(function(err, messageHistory) {
            for(singleMessage of messageHistory) {
              socket.emit('new_message', {full_message: singleMessage.full_message});
            }
          });

      };

}


  module.exports = mysockets;