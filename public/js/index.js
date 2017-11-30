//this will be the client code
var socket=io();  //this opens up a socket

function scrollToBottom(){
  //selectors
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');
  //Heights
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight =messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if (clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
    console.log('should scroll');
  }
}

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
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // console.log('newMessage', message);
  // var li=jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
  scrollToBottom();
})


/*socket.emit('createMessage',{
  from: 'Frank',
  text: 'Hi'
},function (data){ //  data is referring to the servers  'this is from the server'  in   callback('this is from the server');
  console.log('Got it',data);
}); //function (){} is the callback function for aknowldgment*/

socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt:formattedTime
  })

  jQuery('#messages').append(html);
  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My current location</a>');  //_blank opens up a new tag
  //
  // li.text(`${message.from}: ${formattedTime} `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  scrollToBottom();
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault(); //normall when w submit the form, the variable that we are sending binds to the URL, this prevents that

  var messageTextbox=jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text:messageTextbox.val()
  },function(data){// once we get the value we call this function
    //console.log(data);
    messageTextbox.val('')
  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){ //didn't have to install anything for this. This object is available in the browser
    return alert('Geolocation not support by your browser.')
  }

  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location.');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
    console.log(position);
  },function()  {//this function executes if something goes wrong
      locationButton.attr('disabled','disabled').text('Send location...');
    alert('Unable to fetch location.');
  });
});
