const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  mobile: String,
  role: String
},
{
       timestamps: true
    }
  );

module.exports = mongoose.model('User', userSchema);
