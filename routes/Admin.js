const express = require('express');
const router = express.Router();
const adminController = require('../Contollers/AdminController');

router.get('/allRequest', adminController.getAllRequests);
router.get('/allArtisans', adminController.getAllArtisansRequest);
router.post('/:id/verify/', adminController.verifyAnArtisan);
router.get('/allUsers', adminController.getAllUsers);
router.post('/addSpecialization', adminController.addSpecialization);
router.get('/getAllSpecialization', adminController.getAllSpecialization);
router.delete('/deleteASpecialization', adminController.deleteSpecialization);

module.exports = router;