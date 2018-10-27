const express = require('express');
const router = express.Router();

const ClassesController = require('../controllers/classes');

router.get('', ClassesController.getAllClasses);
router.post('', ClassesController.createClass)

// router.get('/:id', ClassesController.getClassById);

router.get('/ping', ClassesController.pingPong);

module.exports = router;
