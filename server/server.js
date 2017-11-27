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

  socket.on('disconnect',()=>{
    console.log('User was Disconnected');
  });
}); //this listen to connection events like a new user connected





server.listen(port,()=>{  //app.lister is same as ttp.createServer(app) it does this behind the seen
  console.log(`Server is up on ${port}` );
});
