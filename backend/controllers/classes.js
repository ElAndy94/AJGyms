const classes = [
  {
      location: 'Market Street',
      classType: 'Induction only',
      className: 'Intro class',
      startTime: '10:00'
  },
  {
      location: 'Portland Street',
      classType: 'intermediate',
      className: 'Mass Building',
      startTime: '19:00'
  },
];

// api/classes/ping for this one *
exports.pingPong = (req, res) => {
  return res.send('dilly dilly pong pong');
}

exports.getAllClasses = (req, res) => {
  return res.json(classes);
}
