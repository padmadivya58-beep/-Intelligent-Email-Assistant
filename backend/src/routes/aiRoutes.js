const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/summarize', (req, res) => {
  const { email } = req.body || {};
  res.json({
    success: true,
    data: {
      summary: email
        ? `Summary: The message focuses on status updates, deadlines, and requested follow-up actions from the sender.`
        : 'No email content provided',
      actionItems: ['Review final draft', 'Share progress update'],
      priority: 'medium',
    },
  });
});

router.post('/reply', (req, res) => {
  const { tone = 'professional' } = req.body || {};
  res.json({
    success: true,
    data: {
      tone,
      reply: `Hi, thanks for the update. I have reviewed the details and will follow up on the requested items by the end of the day. Please let me know if there are any changes or additional context you would like me to consider.`,
    },
  });
});

module.exports = router;
