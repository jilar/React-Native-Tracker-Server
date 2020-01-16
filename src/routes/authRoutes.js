//file deals with all authentication requests

const express = require ('express');
const mongoose = require('mongoose');

//json web token library
const jwt= require('jsonwebtoken');

const User=mongoose.model('User');

//object that allows a number of route handlers to be associated with it
const router = express.Router();

//everytime someone makes  post request to sign up, run this function
router.post('/signup', async (req, res) => {
    const{email,password} =req.body;
    try{
      const user= new User ({email,password});
      console.log(user);
      //save instance of user to mongoDB
      await user.save();
      //create token; first parameter is information we want to include in token, second parameter is key we use to sign token
      const token=jwt.sign({userId: user._id}, "MY_SECRET_KEY");
      
      res.send({token});
    }catch(err){
      return res.status(422).send(err.message)
    }
});

//make sure router can be used by other files
module.exports = router;
