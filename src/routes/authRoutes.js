//file deals with all authentication requests
const express = require ('express');
const mongoose = require('mongoose');
const User=mongoose.model;

//object that allows a number of route handlers to be associated with it
const router = express.Router();

//everytime someone makes  post request to sign up, run this function
router.post('/signup', async (req, res) => {
//  const{email,password} =req.body;
//  const user= new User ({email,password});
  //save instance of user
//  await user.save();
  console.log(req.body);
  res.send('You made a post requestt');
});

//make sure router can be used by other files
module.exports = router;
