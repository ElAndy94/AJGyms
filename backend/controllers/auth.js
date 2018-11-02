const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      contract: req.body.contract,
      date: req.body.date,
      payment: req.body.payment,
      goal: req.body.goal,
      gymLocation: req.body.gymLocation
    });
    user.save()
      .then(createdUser => {
        res.status(201).json({
          message: "User added Successfully",
          gymClass: {
            ...createdUser,
            id: createdUser._id,
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating User Failed!"
        });
      });
  });
}

exports.login = (req, res) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      });
    }
    res.status(200).json({
      _id: fetchedUser._id,
      message: 'User Found!'
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(501).json({
      message: "Invalid credentials!"
    });
  });
}

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      // console.log(user);
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching User Failed"
      });
    });
}

exports.bookClass = (req, res) => {
  User.findById({
    _id: req.body.userId
  }, 'bookedClasses', (err) => {
    if (err) {
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
      const classToAdd = {
        classId: mongoose.Types.ObjectId(req.body.classId),
        dateBooked: (req.body.date)
      };
      User.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.body.userId)
      },
      {$push: { bookedClasses : classToAdd }},
        (err) => {
          if(err) {
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

exports.deleteClass = (req, res) => {
  console.log('auth userid', req.body.userId);
  console.log('auth classid', req.body.classId);
  User.findById({
    _id: req.body.userId
  }, 'bookedClasses', (err) => {
    if (err) {
      console.log('auth up here');
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
      GymClass.findByIdAndDelete({
        "bookedClasses.classId" : mongoose.Types.ObjectId(req.body.classId)
      }, (err) => {
        if(err) {
          console.log('auth down here');
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

exports.bookedClasses = (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: 'bookedClasses.classId',
      model: 'createClass'
    })
    .then(user => {
      res.status(200).json(user.bookedClasses);
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching User Classes Failed"
      });
    });
}
