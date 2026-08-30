const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/oauth/google/start', (req, res) => {
  res.json({
    success: true,
    data: {
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/gmail.modify+https://www.googleapis.com/auth/gmail.send&access_type=offline&prompt=consent',
      provider: 'google',
    },
  });
});

router.get('/oauth/google/callback', (req, res) => {
  res.json({
    success: true,
    data: {
      connected: true,
      provider: 'google',
      message: 'OAuth flow initialized successfully',
    },
  });
});

router.get('/google/status', (req, res) => {
  res.json({
    success: true,
    data: {
      connected: false,
      provider: 'google',
      status: 'not_connected',
    },
  });
});

module.exports = router;
