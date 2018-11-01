const express = require('express');
const router = express.Router();

const UserController = require('../controllers/auth');

router.post('', UserController.createUser);

router.post('/check', UserController.checkUser);

router.post('/bookclass', UserController.bookClass);

router.get('/:id', UserController.getUser);

router.get('/booked:id', UserController.bookedClasses)

module.exports = router;
