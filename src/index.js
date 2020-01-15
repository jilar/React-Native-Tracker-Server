//require('./models/User');

//import express library
const express = require('express');
//import mongoose libary to connect to mongodb
const mongoose =require('mongoose');
//bodyparser automatically parses body information of requests
const bodyparser= require ('body-parser');

const authRoutes= require('./routes/authRoutes');

//create app object, will represent entire application
const app = express();

//app.use(bodyParser.json());

//associate routs to application
app.use(authRoutes);


//connect to database
const mongoUri='mongodb+srv://admin:Password1!@cluster0-r8wji.mongodb.net/test?retryWrites=true&w=majority';

//connect- objects in function prevent common error messages
mongoose.connect(mongoUri,{
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology:true
});

//each succesful connect cause this callback to run
mongoose.connection.on('connected', () =>{
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) =>{
  console.log('Error connecting: ', err);
});

//set up route hander
//anytime someone makes a get type http request to route of application, do this function
app.get('/',(req, res) =>{
  res.send("Hi There ");
});

//have app listen to particular port on local machine
app.listen(3000,()=>{
  console.log('Listening on port 3000');
})
