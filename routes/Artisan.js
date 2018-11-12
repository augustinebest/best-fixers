const express = require('express');
const router = express.Router();
const artisanController = require('../Contollers/ArtController');
const upload = require('../Services/image_uploads');


router.post('/addArtisan', upload.upload.single('image'), artisanController.addArtisan);
router.get('/:id/profile', artisanController.artisanProfile);
router.post('/:id/accept', artisanController.acceptRequest);
router.post(`/auth/set-password`, artisanController.setPassword);

module.exports = router;