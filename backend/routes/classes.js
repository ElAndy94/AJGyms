const express = require('express');
const router = express.Router();

const ClassesController = require('../controllers/classes');

router.get('', ClassesController.getAllClasses);

router.get('/ping', ClassesController.pingPong);

module.exports = router;
