const express = require('express');
const router = express.Router();
const userController = require('../Contollers/UserController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/:id/profile', userController.userProfile);

module.exports = router;