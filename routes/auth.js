const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSingup);
router.post('/signup', validator('signup'), authController.postSignup);
router.post('/logout', authController.postLogout);
module.exports = router;