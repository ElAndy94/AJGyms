const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const classes = [
    {
        location: 'Market Street',
        classType: 'Induction only',
        className: 'Intro class',
        startTime: '10:00am'
    },
    {
        location: 'Portland Street',
        classType: 'intermediate',
        className: 'Mass Building',
        startTime: '7:00pm'
    },
];

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/api/classes', (req, res) => {
    return res.json(classes);
});

app.listen(process.env.PORT || 8080);