const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required: true,
  },
  lastName: {
    type:String,
  },
  email: { 
    type: String,
     unique: true,
     required: true
     },
     gender:{
    type: String,
    enum:["male","female","other"]
  },
  password: {
     type: String,
      required: true,
      minlength: 6
    },
  bio: {
    type: String,
    default: 'This is a demo account bio'
  }
},{timestamps:true});
module.exports = mongoose.model('User', userSchema);
