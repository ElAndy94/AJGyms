const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const logger = require('../utility/logger');
const accessed = require('../utility/accessed');
const change = require('../utility/change');
const config = require('../config/config');

const User = require('../models/user');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
// transporter.sendMail(mailOptions, (error, info) =>{
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: `${config.sendEmail}`
  }
}));

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let emailLowerCase = req.body.email.toLowerCase();
    let userName = req.body.name;
    const user = new User({
      name: req.body.name,
      email: emailLowerCase,
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
        change.change(`User ${userName} has created an account using this email: ${emailLowerCase}.`);
        res.status(201).json({
          message: "User added Successfully",
          gymClass: {
            ...createdUser,
            id: createdUser._id,
          }
        });
        return transporter.sendMail({
          to: emailLowerCase,
          from: 'andrewpeliza@hotmail.com',
          subject: 'Signup succeeded',
          html: '<h1>You successfully signed up!</h1>'
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Creating User Failed!"
        });
      });
  });
}

exports.login = (req, res) => {
  let fetchedUser;
  let emailLowerCase = req.body.email.toLowerCase();
  User.findOne({
    email: emailLowerCase
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
      logger.info(`User ${fetchedUser.name} entered an incorrect password.`);
      return res.status(401).json({
        message: 'Invalid Credentials'
      });
    }
    accessed.accessed(`User ${fetchedUser.name} logged in`);
    res.status(200).json({
      _id: fetchedUser._id,
      name: fetchedUser.name,
      pt: fetchedUser.pt,
      admin: fetchedUser.admin,
      message: 'User Found!'
    });
  })
  .catch(err => {
    logger.info(`User ${user.name} not found.`);
    res.status(500).json({
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

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      logger.error(`Users could not be fetched.`);
      return res.status(500).json({
        message: "Users not found!"
      });
    }
    logger.info(`Users has been requested.`);
    return res.json(users);
  });
}

exports.bookClass = (req, res) => {
  let userId = req.body.userId;
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
            change.change(`User ${userId} has booked themselves into a class.`);
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
  let userId = req.params.userId;
  User.findById({
    _id: req.params.userId
  }, 'bookedClasses', (err) => {
    if (err) {
      res.status(401).json({
        message: "Error Occured!"
      })
    } else {
      User.findOneAndUpdate({
        "bookedClasses.classId" : mongoose.Types.ObjectId(req.params.id),
        },
      {
        $pull : { "bookedClasses" : { classId : req.params.id } }
      }, (err) => {
        if(err) {
          res.status(401).json({
            message: "Error Occured!"
          })
        } else {
          change.change(`User ${userId} has removed themselves from a class.`);
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

exports.updateInfo = (req, res) => {
  let userId = req.body.userId;
  let emailLowerCase = req.body.userEmail.toLowerCase();
  User.findByIdAndUpdate({
    _id: req.body.userId
  }, {
    $set: {
      email: emailLowerCase,
      address: req.body.userAddress
    }
  }, {
    upsert: false
  },
  (err) => {
    if (err) {
      res.status(400).json({
        message: "Error Occured"
      })
    } else {
      change.change(`User ${userId} has updated their email and address.`);
      res.status(200).json({
        message: "Details Successfully Updated!"
      })
    }
  });
}
