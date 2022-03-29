const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = require('../../../utils/prisma');
const validationSchema = require('../../../validators/index');
const validate = require('../../../middlewares/validator');

router.post('/login', validate(validationSchema.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.json({ message: 'email or password is incorrect!' });
    }
    const result = await bcrypt.compare(password, user.hashedPassword);
    if (!result) {
      return res.json({ message: 'email or password is incorrect!' });
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_TOKEN,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    res.json({ error: error.name });
  }
});

router.post('/signup',validate(validationSchema.signup), async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    let user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return res.status(409).json({ message: 'this email is alreay taken.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: { email: email, name: name, hashedPassword: hashedPassword },
    });
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_TOKEN,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7,
      }
    );
    user.token = token;
    delete user.hashedPassword;
    delete user.isAdmin;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: error.name });
  }
});

module.exports = router;
