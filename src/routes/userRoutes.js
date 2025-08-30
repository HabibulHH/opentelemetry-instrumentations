const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/create', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;