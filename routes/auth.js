const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/signup', authController.getSingup);

router.post('/signup',authController.postSignup);

router.post('/logout', authController.postLogout);
module.exports = router;
