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
  console.log('newMessage', message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})


/*socket.emit('createMessage',{
  from: 'Frank',
  text: 'Hi'
},function (data){ //  data is referring to the servers  'this is from the server'  in   callback('this is from the server');
  console.log('Got it',data);
}); //function (){} is the callback function for aknowldgment*/

jQuery('#message-form').on('submit',function(e){
  e.preventDefault(); //normall when w submit the form, the variable that we are sending binds to the URL, this prevents that

  socket.emit('createMessage', {
    from: 'User',
    text:jQuery('[name=message]').val()
  },function(data){// once we get the value we call this function
    console.log(data);
  });
});
