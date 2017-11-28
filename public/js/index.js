//this will be the client code
var socket=io();  //this opens up a socket
socket.on('connect',function(){ //client is firing an event on connect
  console.log('Connected to server');

  /*
  socket.emit('createEmail',{
    to: 'jen@example.com',
    text: 'hey.This is andrew'
  })
})*/
  /*socket.emit('createMessage',{ //this will emit a message to the server
    from: 'Andrew',
    text:'Yup,that works for me,'
  });*/
});

socket.on('disconnect',function (){    //()=> format function doesn't work well in brosers or mobile other than chrome
  console.log('Disconnected from server');
})
/*
socket.on('newEmail', function(){  //function without the argument
  console.log('New Email');
})*/

/*
socket.on('newEmail', function(email){  //email is the json object that is passed in from
  console.log('New Email',email);
})*/

socket.on('newMessage',function(message){ //event listener with name 'newMessage'
  console.log('newMessage', message)
})


socket.emit('createMessage',{
  from: 'Frank',
  text: 'Hi'
},function (data){ //  data is referring to the servers  'this is from the server'  in   callback('this is from the server');
  console.log('Got it',data);
}); //function (){} is the callback function for aknowldgment
