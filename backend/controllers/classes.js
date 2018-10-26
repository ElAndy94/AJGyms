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
  return res.json(classes);
}

// api/classes/ping for this one *
exports.pingPong = (req, res) => {
  return res.send('dilly dilly pong pong');
}

// exports.getClassById = (req, res) => {
//   classes.findById(req.params.id)
//     .then(gymClass => {
//       if (gymClass) {
//         res.status(200).json(gymClass);
//       } else {
//         res.status(404).json({
//           message: 'Class not found!'
//         });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching class failed!"
//       });
//     });
//   // console.log(req.params.id);
//   // if (req.params.id === classes.id) {
//   //   console.log(classes.id);
//   // }
// }
