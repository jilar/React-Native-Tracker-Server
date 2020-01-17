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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  //wrap comparison in try catch statement in case promise is rejected
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});


//make sure router can be used by other files
module.exports = router;
