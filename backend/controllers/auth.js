const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const logger = require('../utility/logger');

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
    api_key: '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'
  }
}));

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let emailLowerCase = req.body.email.toLowerCase();
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
      .catch(error => {
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
      return res.status(401).json({
        message: 'Invalid Credentials'
      });
    }
    res.status(200).json({
      _id: fetchedUser._id,
      name: fetchedUser.name,
      pt: fetchedUser.pt,
      message: 'User Found!'
    });
  })
  .catch(err => {
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
          console.log('the error', err);
          // console.log('auth down here');
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

exports.updateInfo = (req, res) => {
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
      res.status(200).json({
        message: "Details Successfully Updated!"
      })
    }
  });
}
