const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const env = require('./env');
const logger = require('../utils/logger');

let isConnected = false;
let isInMemory = false;

const inMemoryStore = {
  users: [],
  emails: [],
  threads: [],
  integrations: [],
  activities: [],
  notifications: [],
  aiResponses: [],
};

async function seedDemoUser() {
  const demoEmail = 'admin@example.com';
  const existing = inMemoryStore.users.find((user) => user.email === demoEmail);
  if (existing) return existing;

  const passwordHash = await bcrypt.hash('password123', 12);
  const demoUser = {
    _id: crypto.randomUUID(),
    id: crypto.randomUUID(),
    name: 'Admin User',
    email: demoEmail,
    password: passwordHash,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  inMemoryStore.users.push(demoUser);
  return demoUser;
}

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 2500 });
    isConnected = true;
    isInMemory = false;
    logger.info('✅ MongoDB connected');
  } catch (error) {
    logger.warn(`⚠️ MongoDB unavailable: ${error.message}. Using in-memory fallback.`);
    isConnected = true;
    isInMemory = true;
  }

  if (isInMemory) {
    await seedDemoUser();
  }
}

function getDatabaseStatus() {
  return {
    connected: isConnected,
    type: isInMemory ? 'in-memory' : 'mongodb',
    uri: isInMemory ? 'memory://intelligent-email-assistant' : env.MONGO_URI,
  };
}

module.exports = {
  connectDB,
  getDatabaseStatus,
  inMemoryStore,
  isInMemory: () => isInMemory,
};
