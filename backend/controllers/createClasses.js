const createClass = require('../models/classes');

exports.createClass = (req, res) => {
  const gymClass = new createClass({
    location: req.body.location,
    type: req.body.type,
    name: req.body.name,
    time: req.body.time
  });
  gymClass.save()
    .then(createdClass => {
      res.status(201).json({
        message: "Class added Successfully",
        gymClass: {
          ...createdClass,
          id: createdClass._id,
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating Class Failed!"
      });
    });
}
