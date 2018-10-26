const express = require('express');
const router = express.Router();

const CreateController = require('../controllers/createClasses');

router.post('', CreateController.createClass);

module.exports = router;
