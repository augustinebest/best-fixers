const express = require('express');
const router = express.Router();
const artisanController = require('../Contollers/ArtController');
const upload = require('../Services/image_uploads');


router.post('/addArtisan', upload.upload.single('image'), artisanController.addArtisan);

module.exports = router;