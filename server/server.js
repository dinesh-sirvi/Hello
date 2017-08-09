const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection' ,(socket)=>{
  console.log("A new user is connected");

  socket.on('createMessage', (newMsg)=>{
    console.log(newMsg);
  });

  socket.emit('newMessage', {
    "sender": "someOne",
    "text": "Hello there!"
  });

  socket.on('disconnect', ()=>{
    console.log("A user has beed disconnected");
  });

});


server.listen(port, ()=>{
  console.log(`Server is up on PORT ${port}`);
});
