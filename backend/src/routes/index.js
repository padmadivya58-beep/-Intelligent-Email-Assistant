const express = require('express');
const authRoutes = require('./authRoutes');
const mailRoutes = require('./mailRoutes');
const integrationRoutes = require('./integrationRoutes');
const aiRoutes = require('./aiRoutes');
const activityRoutes = require('./activityRoutes');
const notificationRoutes = require('./notificationRoutes');
const { getDatabaseStatus } = require('../config/db');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Intelligent Email Assistant API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: getDatabaseStatus(),
  });
});

router.use('/auth', authRoutes);
router.use('/mail', mailRoutes);
router.use('/integrations', integrationRoutes);
router.use('/ai', aiRoutes);
router.use('/activity', activityRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
