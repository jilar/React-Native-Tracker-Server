const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//pre-save hook. runs before save function
//normal (non arrow) function so "this" points to user and not context of User.js
userSchema.pre('save',function(next){
  const user=this;
  //if user hasnt modified password dont do anything
  if(!user.isModified('password')){
    return next();
  }

  //10 is reference to salt complexity
  bcrypt.genSalt(10,(err,salt)=>{
    if(err){
      return next(err);
    }
    //creat hash with generated salt. After invoke callback
    bcrypt.hash(user.password, salt, (err,hash)=>{
      if(err){
        return next(err);
      }
      user.password=hash;
      next();
    });
  });
});

//candidatePassword; what the user is trying to log in with
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};



mongoose.model("User",userSchema);
