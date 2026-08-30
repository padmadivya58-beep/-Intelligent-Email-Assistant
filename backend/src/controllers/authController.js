const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const { MemoryDB } = require('../models/dataStore');

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const existing = await MemoryDB.users.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          error: { code: 'USER_EXISTS', message: 'An account with this email already exists' },
        });
      }

      const user = await MemoryDB.users.create({ name, email, password, role: 'user' });
      const token = generateToken(user);

      res.status(201).json({
        success: true,
        data: {
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await MemoryDB.users.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        });
      }

      const token = generateToken(user);
      res.json({
        success: true,
        data: {
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res) {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
}

module.exports = new AuthController();
