const express = require('express');
const router = express.Router();
const dashboardRoutes = require('./dashboard');
const projectRoutes = require('./project');
const issueRoutes = require('./issue');
const authRoutes = require('./auth');
const authMiddleware = require('../../../middlewares/api/auth');

router.use(authRoutes);
router.use(authMiddleware);
router.use('/dashboard', dashboardRoutes);
router.use('/project', projectRoutes);
router.use('/issue', issueRoutes);

module.exports = router;