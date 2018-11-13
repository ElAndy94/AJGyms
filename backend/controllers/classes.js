const mongoose = require('mongoose');
const GymClass = require('../models/classes');
const User = require('../models/user');

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

exports.deleteClass = (req, res) => {
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

exports.deleteUser = (req, res) => {
  GymClass.findById({
    _id: req.params.id
  }, 'classMembers', (err) => {
    if (err) {
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
        GymClass.findOneAndUpdate({
          "classMembers.userId" : mongoose.Types.ObjectId(req.params.userId),
          },
        {
          $pull : { "classMembers" : { userId : req.params.userId } }
        }, (err, doc) => {
        if(err) {
          console.log('err in class', err);
            // console.log('Keeps hitting here!');
            res.status(401).json({
              message: "Error Occured!"
            })
        } else {
          res.status(200).json({
            message: "Success!"
          })
        }
      });
    }
  })
}

exports.bookClass = (req, res) => {
  GymClass.findById({
    _id: req.body.classId
  }, 'classMembers', (err) => {
    if (err) {
      console.log('up here');
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
      const userToAdd = {
        userId: mongoose.Types.ObjectId(req.body.userId),
      };
      GymClass.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.body.classId)
      },
      {$push: { classMembers : userToAdd }},
        (err) => {
          if(err) {
            console.log('here');
            res.status(401).json({
              message: "Error Occured!"
            })
          } else {
            res.status(200).json({
              message: "Success!"
            })
          }
        }
      );
    }
  });
}

// exports.getBookedClasses = (req, res) => {
//   GymClass.findById(req.params.id)
//     .then(gymClass => {
//       res.status(200).json(gymClass);
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "No Class Found"
//       })
//     })
// }
