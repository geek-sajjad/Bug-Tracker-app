const express = require('express');
const dashboardRoutes = require('./dashboard');
const testRoutes = require('./test');
const router = express.Router();


router.use('/dashboard', dashboardRoutes);
router.use('/test', testRoutes);

module.exports = router;