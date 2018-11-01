const bcrypt = require('bcryptjs');
const User = require('../models/user');
const mongoose = require('mongoose');

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

exports.checkUser = (req, res) => {
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
  }, 'bookedClasses', function (err) {
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


// exports.bookClass = (req, res) => {
//   User.findById({
//     _id: req.body.id
//   }, 'bookedClasses', function (err) {
//     if (err) {
//       res.status(401).json({
//         message: "Error Occured!"
//       })
//     } else {
//       User.findOneAndUpdate({
//         "bookedClasses.classId" : mongoose.Types.ObjectId(req.body.classId),
//         "bookedClasses.dateBooked" : (req.body.date)
//         },
//         (err) => {
//             if(err) {
//               res.status(401).json({
//                 message: "Error Occured!"
//               })
//             } else {
//               res.status(200).json({
//                 message: "Success!"
//               })
//             }
//         }
//       );
//     }
//   });
// }
