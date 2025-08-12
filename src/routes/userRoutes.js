const express = require('express');
const userController    = require('../controller/userController');
const router = express.Router();

router.get('/create',userController.createUser);

module.exports = router;