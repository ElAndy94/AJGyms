const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contract: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  gymLocation: {
    type: String,
    required: true
  },
  pt: {
    type: Boolean,
    required: false
  },
  admin: {
    type: Boolean,
    required: false
  },
});

userSchema.plugin(uniqueVal);

module.exports = mongoose.model('user', userSchema);
