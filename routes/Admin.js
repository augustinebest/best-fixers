const express = require('express');
const router = express.Router();
const adminController = require('../Contollers/AdminController');


router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/allRequest', adminController.getAllRequests);

module.exports = router;