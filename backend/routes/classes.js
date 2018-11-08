const express = require('express');
const router = express.Router();

const ClassesController = require('../controllers/classes');

router.get('', ClassesController.getAllClasses);

router.get('/:id', ClassesController.getClassById);

router.post('', ClassesController.createClass);

router.post('/bookclass', ClassesController.bookClass);

router.delete('/:id', ClassesController.deleteClass);

router.delete('/:id/user/:userId', ClassesController.deleteUser);

module.exports = router;
