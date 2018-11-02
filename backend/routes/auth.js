const express = require('express');
const router = express.Router();

const UserController = require('../controllers/auth');

router.post('', UserController.createUser);

router.post('/login', UserController.login);

router.post('/bookclass', UserController.bookClass);

router.get('/:id', UserController.getUser);

router.get('/booked/:id', UserController.bookedClasses);

router.delete('/remove', UserController.deleteClass);

module.exports = router;
