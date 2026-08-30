const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'a1', type: 'signin', message: 'User signed in successfully', time: new Date().toISOString() },
      { id: 'a2', type: 'gmail', message: 'Gmail connection checked', time: new Date(Date.now() - 600000).toISOString() },
    ],
  });
});

module.exports = router;
