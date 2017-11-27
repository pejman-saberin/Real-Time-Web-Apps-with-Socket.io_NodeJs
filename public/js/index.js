//this will be the client code
var socket=io();  //this opens up a socket
socket.on('connect',function(){ //client is firing an event on connect
  console.log('Connected to server');

  socket.emit('createEmail',{
    to: 'jen@example.com',
    text: 'hey.This is andrew'
  })
})

socket.on('disconnect',function (){    //()=> format function doesn't work well in brosers or mobile other than chrome
  console.log('Disconnected from server');
})
/*
socket.on('newEmail', function(){  //function without the argument
  console.log('New Email');
})*/

socket.on('newEmail', function(email){  //email is the json object that is passed in from
  console.log('New Email',email);
})