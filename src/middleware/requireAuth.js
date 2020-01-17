const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const User=mongoose.model('User');

module.exports=(req,res,next)=>{
  //pull authoirzarion from request
  const {authorization} =req.headers;
  //no token? cant log in
  if(!authorization){
    return res.status(401).send({error: 'You must be logged in.'});
  }
  //extract token out of header
  //currently authorization === 'Bearer + token'.Remove Bearer. with replace()
  const token = authorization.replace('Bearer ', '');
  //verify jsonwebtoken, then extract payload data (user id)
  jwt.verify(token, 'MY_SECRET_KEY', async (err,payload)=>{
    if (err){
      return res.status(401).send({error: 'You must be logged in.'})
    }
    const {userId}=payload;

    //tell mongoose to fetcher user by userId
    const user = await User.findById(userId)
    req.user=user;

    //call next middlewares
    next();
  })
};
