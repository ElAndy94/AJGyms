const mongoose = require('mongoose');
const GymClass = require('../models/classes');
const logger = require('../utility/logger');
const change = require('../utility/change');


exports.getAllClasses = (req, res) => {
  GymClass.find({}, (err, classes) => {
    if (err) {
      return res.status(500).json({
        message: "Classes Not Found!"
      });
    }
    logger.info(`Classes has been requested.`);
    return res.json(classes);
  })
}

exports.createClass = (req, res) => {
  let pt = req.body.ptName;
  let className = req.body.name;
  const gymClass = new GymClass({
    location: req.body.location,
    type: req.body.type,
    name: req.body.name,
    time: req.body.time,
    ptName: req.body.ptName
  });
  gymClass.save()
    .then(createdClass => {
      change.change(`User ${pt} has created a class named ${className}.`);
      res.status(201).json({
        message: "Class added Successfully",
        gymClass: {
          ...createdClass,
          id: createdClass._id,
        }
      });
    })
    .catch(error => {
      logger.error(`User ${pt} attempted to created a class but was not able too - error: ${error}`);
      res.status(500).json({
        message: "Creating Class Failed!"
      });
    });
}

exports.getClassById = (req, res) => {
  let classId = req.params.id;
  GymClass.findById(req.params.id)
    .then(gymClass => {
      if (gymClass) {
        res.status(200).json(gymClass);
      } else {
       res.status(404).json(CLASS_NOT_FOUND);
      }
    })
    .catch(() => {
      logger.error(`Class ${classId} was not fetched, something failed!`);
      res.status(500).json({
        message: "Fetching class failed!"
      });
    });
}

exports.deleteClass = (req, res) => {
  let classId = req.params.id;
  GymClass.findByIdAndRemove({
      _id: req.params.id
    })
    .then(result => {
      change.change(`Class ${classId} has been deleted!`);
      res.status(200).json({
        message: "Class has been deleted successfully!",
        result: result
      });
    })
    .catch(() => {
      logger.error(`Class ${classId} was not deleted!`);
      res.status(500).json({
        message: 'Class was not deleted!'
      })
    });
}

exports.deleteUser = (req, res) => {
  let userId = req.params.userId;
  let classId = req.params.id;
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
          logger.error(`User ${userId} was not able to be deleted from the ${classId} class.`);
          res.status(401).json({
            message: "Error Occured!"
          })
        } else {
          change.change(`User ${userId} was deleted from the ${classId} class.`);
          res.status(200).json({
            message: "Success!"
          })
        }
      });
    }
  })
}

exports.bookClass = (req, res) => {
  let userId = req.body.userId;
  let classId = req.body.classId;
  GymClass.findById({
    _id: req.body.classId
  }, 'classMembers', (err) => {
    if (err) {
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
            logger.error(`User ${userId} was not able to be booked to ${classId} class.`);
            res.status(401).json({
              message: "Error Occured!"
            })
          } else {
            change.change(`User ${userId} was booked to ${classId} class.`);
            res.status(200).json({
              message: "Success!"
            })
          }
        }
      );
    }
  });
}