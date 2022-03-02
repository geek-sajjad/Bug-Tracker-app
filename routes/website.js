const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/website');

router.get('/', websiteController.getIndex);

module.exports = router;