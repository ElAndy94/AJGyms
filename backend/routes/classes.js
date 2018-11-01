const express = require('express');
const router = express.Router();

const ClassesController = require('../controllers/classes');

router.get('', ClassesController.getAllClasses);

router.get('/:id', ClassesController.getClassById);

router.get('/booked', ClassesController.getBookedClasses);

router.post('', ClassesController.createClass);

router.delete('/:id', ClassesController.deleteClass);

module.exports = router;
