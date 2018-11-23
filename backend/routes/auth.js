const express = require('express');
const router = express.Router();

const UserController = require('../controllers/auth');

router.get('/:id', UserController.getUser);

router.get('', UserController.getUsers);

router.get('/booked/:id', UserController.bookedClasses);

router.post('', UserController.createUser);

router.post('/login', UserController.login);

router.post('/infoUpdate', UserController.updateInfo);

// router.delete('/:id/user/:userId', UserController.deleteClass);

// router.post('/bookclass', UserController.bookClass);

module.exports = router;
