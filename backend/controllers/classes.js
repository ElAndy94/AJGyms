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

// api/classes/ping for this one *
exports.pingPong = (req, res) => {
  return res.send('dilly dilly pong pong');
}

exports.getAllClasses = (req, res) => {
  return res.json(classes);
}
