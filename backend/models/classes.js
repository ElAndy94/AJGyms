const mongoose = require('mongoose');

const classMembersSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
})

const classSchema = mongoose.Schema({
  // id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  classMembers: [classMembersSchema]
});

module.exports = mongoose.model('createClass', classSchema);
