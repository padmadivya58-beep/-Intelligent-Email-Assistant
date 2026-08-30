const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { MemoryDB } = require('../models/dataStore');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Access token is missing or malformed' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await MemoryDB.users.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'Authenticated user no longer exists' },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: { code: 'AUTH_EXPIRED', message: 'Token has expired or is invalid' },
    });
  }
}

module.exports = { authenticate };
