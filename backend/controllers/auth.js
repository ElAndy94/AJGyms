const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const logger = require('../utility/logger');
const accessed = require('../utility/accessed');
const change = require('../utility/change');
const config = require('../config/config');

const User = require('../models/user');
const GymClass = require('../models/classes');

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
  let emailLowerCase = req.body.email.toLowerCase();
  User.findOne({ email: emailLowerCase }, (err, user) => {
    if (err) {
      logger.error(`Error while finding user ${emailLowerCase}`);
      res.status(500).json({
        message: 'Server Error'
      });
    }

    if (!user) {
      logger.info(`Unable to find user ${emailLowerCase}`);
      res.status(404).json({
        message: 'Invalid Credentials'
      });
    } else {
      const hash = user.password;
      const password = req.body.password;
      bcrypt.compare(password, hash, (err, passwordMatches) => {
        if (passwordMatches) {
          logger.info(`User ${user.name} logged in`);
          res.status(200).json({
            _id: user._id,
            name: user.name,
            pt: user.pt,
            message: 'User Found!'
          });
        } else {
          logger.warn(`User ${user.email} attempted to log in`);
          res.status(404).json({
            message: 'Invalid Credentials'
          });
        }
      });
    }
  })
  .catch( (err) => {
    logger.log(err);
    res.status(500).json({
      message: 'Server Error'
    });
  });
}

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        pt: user.pt,
        address: user.address,
        email: user.email,
        contract: user.contract,
        date: user.date,
        gymLocation: user.gymLocation
      });
    })
    .catch(() => {
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

exports.bookedClasses = (req, res) => {
  const userId = req.params.id;
  const userClasses = [];
  const filteredClasses = [];
  GymClass.find({}, (err, classes) => {
    if (err) {
      logger.error(`Classes could not be fetched.`);
      return res.status(500).json({
        message: "Classes not found!"
      });
    }
    classes.map( (gymClass) => {
      const attendees = gymClass.classMembers;

      attendees.forEach((attendee) =>{
        if (attendee.userId.equals(userId)) {
          userClasses.push(gymClass._id);
        }
      });
    }, (err) => {
      if(err) {
        res.status(401).json({
          message: "Error Occured!"
        })
      }
    })
    classes.map( (gymClass) => {
      if (userClasses.includes(gymClass._id)) {
        filteredClasses.push(gymClass);
      }
    }, (err) => {
      if(err) {
        res.status(401).json({
          message: "Error Occured!"
        })
      }
    })
    res.status(200).json(filteredClasses);
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

// exports.deleteClass = (req, res) => {
//   let userId = req.params.userId;
//   User.findById({
//     _id: req.params.userId
//   }, 'bookedClasses', (err) => {
//     if (err) {
//       res.status(401).json({
//         message: "Error Occured!"
//       })
//     } else {
//       User.findOneAndUpdate({
//         "bookedClasses.classId" : mongoose.Types.ObjectId(req.params.id),
//         },
//       {
//         $pull : { "bookedClasses" : { classId : req.params.id } }
//       }, (err) => {
//         if(err) {
//           res.status(401).json({
//             message: "Error Occured!"
//           })
//         } else {
//           change.change(`User ${userId} has removed themselves from a class.`);
//           res.status(200).json({
//             message: "Success!"
//           })
//         }
//       });
//     }
//   })
// }
