const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const classesRoutes = require('./backend/routes/classes');
const createClassesRoutes = require('./backend/routes/createClasses');

// app.use(express.static(path.join(__dirname, 'build')));
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://" + "Elandy" + ":" + "React123" + "@ds125263.mlab.com:25263/react-gym", { useNewUrlParser: true })
.then(() => {
    console.log('Connected to the database!')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.listen(process.env.PORT || 8080);

app.use('/api/classes', classesRoutes);
app.use('/api/createClass', createClassesRoutes);

