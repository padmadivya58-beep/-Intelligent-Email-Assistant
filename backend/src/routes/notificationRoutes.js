const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'n1', title: 'Gmail connected', message: 'Your account is ready for inbox sync', read: false },
      { id: 'n2', title: 'AI reply ready', message: 'A draft response is available for review', read: false },
    ],
  });
});

module.exports = router;
