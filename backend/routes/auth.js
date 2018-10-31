const express = require('express');
const router = express.Router();

const UserController = require('../controllers/auth');

router.post('', UserController.createUser);

router.post('/check', UserController.checkUser);

router.get('/:id', UserController.getUser);

module.exports = router;
