const express = require('express');
const router = express.Router();

const UserController = require('../controllers/auth');

router.post('', UserController.createUser);

router.post('/login', UserController.login);

router.post('/bookclass', UserController.bookClass);

router.post('/infoUpdate', UserController.updateInfo);

router.get('/:id', UserController.getUser);

router.get('/booked/:id', UserController.bookedClasses);

router.delete('/:id/user/:userId', UserController.deleteClass);

module.exports = router;
