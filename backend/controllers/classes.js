const GymClass = require('../models/classes');

const CLASS_NOT_FOUND = {
  message: 'Class not found!'
};

const classes = [
  {
      id: '676d34ffdgfdg433',
      location: 'Market Street',
      classType: 'Induction only',
      className: 'Intro class',
      startTime: '10:00'
  },
  {
      id: '34dvf35df34dfvfd',
      location: 'Portland Street',
      classType: 'intermediate',
      className: 'Mass Building',
      startTime: '19:00'
  },
];

exports.getAllClasses = (req, res) => {
  GymClass.find({}, (err, classes) => {
    if (err) {
      console.log(err);
      return res.status(500).json(CLASS_NOT_FOUND);
    }
    return res.json(classes);
  })
}

exports.createClass = (req, res) => {
  const gymClass = new GymClass({
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
      console.log(error)
      res.status(500).json({
        message: "Creating Class Failed!"
      });
    });
}

exports.getClassById = (req, res) => {
  GymClass.findById(req.params.id)
    .then(gymClass => {
      if (gymClass) {
        res.status(200).json(gymClass);
      } else {
       res.status(404).json(CLASS_NOT_FOUND);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching class failed!"
      });
    });
}

exports.deleteClass = (req, res, next) => {
  GymClass.findByIdAndRemove({
      _id: req.params.id
    })
    .then(result => {
      res.status(200).json({
        message: "Class has been deleted successfully!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Class was not deleted!'
      })
    });
}
