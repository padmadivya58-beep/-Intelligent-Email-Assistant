const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/inbox', (req, res) => {
  res.json({
    success: true,
    data: {
      emails: [
        {
          id: 'msg_1',
          from: 'team@company.com',
          subject: 'Weekly status update',
          snippet: 'Here is the weekly progress summary for the product launch.',
          preview: 'Here is the weekly progress summary for the product launch.',
          unread: true,
          starred: false,
          receivedAt: new Date().toISOString(),
        },
        {
          id: 'msg_2',
          from: 'support@service.com',
          subject: 'Meeting notes',
          snippet: 'Please review the attached meeting notes before tomorrow.',
          preview: 'Please review the attached meeting notes before tomorrow.',
          unread: false,
          starred: true,
          receivedAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      total: 2,
    },
  });
});

router.get('/search', (req, res) => {
  res.json({
    success: true,
    data: {
      emails: [],
      total: 0,
    },
  });
});

router.get('/thread/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      subject: 'Weekly status update',
      participants: ['team@company.com'],
      messages: [
        {
          from: 'team@company.com',
          body: 'Hi team, here is the weekly progress update for the launch. We are on track and need final approvals by Friday.',
        },
      ],
    },
  });
});

router.post('/mark-read', (req, res) => {
  res.json({ success: true, data: { updated: true } });
});

router.post('/star', (req, res) => {
  res.json({ success: true, data: { updated: true } });
});

router.post('/send', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'sent_1',
      status: 'sent',
      message: 'Email sent successfully',
    },
  });
});

module.exports = router;
