const path=require ('path');  //default node package no need to
const express=require('express');

const publicPath=path.join(__dirname, '../public' );// join takes the partial paths and joins them together
const port=process.env.PORT || 3000; //herouku needs this
var app=express();


app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log(`Server is up on ${port}` );
});
