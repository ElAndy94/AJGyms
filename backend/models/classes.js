const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  // JH: Commented out this ID field because _id is automatically created, and we should use that.
  //     In addition, I updated the front end code to use _id instead of id when in the GET request
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
});

module.exports = mongoose.model('createClass', classSchema);
