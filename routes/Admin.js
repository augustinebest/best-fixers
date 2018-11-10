const express = require('express');
const router = express.Router();
const adminController = require('../Contollers/AdminController');


router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/allRequest', adminController.getAllRequests);
router.get('/allArtisans', adminController.getAllArtisansRequest);
router.post('/:id/verify/', adminController.verifyAnArtisan);

module.exports = router;