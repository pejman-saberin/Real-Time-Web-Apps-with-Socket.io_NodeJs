const path=require ('path');  //default node package no need to
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname, '../public' );// join takes the partial paths and joins them together
const port=process.env.PORT || 3000; //herouku needs this
var app=express();
var server=http.createServer(app);
var io=socketIO(server); //now we cab accept socket connections

app.use(express.static(publicPath));

//io.on(); //this listen to events
io.on('connection', (socket)=>{  //this event is created from the server
  console.log('New user connected');

  //socket.emit('newEmail');  //newEmailis the name of the event taken from the front end
  /*socket.emit('newEmail',{  //this format is to send to front end an object. Second argument are the passed in json
    from: 'mike@example.com',
    text: 'hey, what is going on',
    createdAt: 123
  });*/

  /*
  socket.on('createEmail',(newEmail)=>{
    console.log('createEmail', newEmail);
  });*/

  socket.on ('createMessage', (message)=>{  //this is the listener in the server side. As soon as 'CreateMessage' is called from the client, io.emit emits a new event to the client
    console.log('createMessage',message);
    /*io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt: new Date().getTime()
    }); //Socket.emit-->emits an event to a single connection ,io.emit-->emits an event to every single connection */
    socket.broadcast.emit('newMessage',{
      from: message.form,
      text:message.text,
      createdAt: new Date().getTime()
    })  //this is going to send the event to everybody but not this socket
  });

  /*socket.emit('newMessage',{ //this will emit the newMessage event to the browser
      from:'John',
      text: 'See you then',
      createdAt:123123
  });*/

  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
}); //this listen to connection events like a new user connected





server.listen(port,()=>{  //app.listen is same as ttp.createServer(app) it does this behind the seen
  console.log(`Server is up on ${port}` );
});
