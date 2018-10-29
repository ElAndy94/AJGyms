const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  pt: {
    type: Boolean,
    required: false
  },
  admin: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model('user', userSchema);
