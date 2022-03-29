const express = require('express');
const router = express.Router();
const dashboardRoutes = require('./dashboard');
const testRoutes = require('./test');
const projectRoutes = require('./project');
const authRoutes = require('./auth');
const authMiddleware = require('../../../middlewares/api/auth');

router.use(authRoutes);
router.use(authMiddleware);
router.use('/dashboard', dashboardRoutes);
router.use('/test', testRoutes);
router.use('/project', projectRoutes);

module.exports = router;