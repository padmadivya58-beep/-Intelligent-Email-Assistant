const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { inMemoryStore } = require('../config/db');

function generateId() {
  return crypto.randomUUID();
}

const MemoryDB = {
  users: {
    async create(data) {
      const id = generateId();
      const hashed = await bcrypt.hash(data.password, 12);
      const doc = {
        _id: id,
        id,
        name: data.name,
        email: data.email.toLowerCase().trim(),
        password: hashed,
        role: data.role || 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.users.push(doc);
      return doc;
    },
    async findOne(query) {
      return inMemoryStore.users.find((user) => {
        if (query.email && user.email !== query.email.toLowerCase().trim()) return false;
        if (query._id && user._id !== query._id) return false;
        return true;
      }) || null;
    },
    async findById(id) {
      return inMemoryStore.users.find((user) => user._id === id) || null;
    },
  },

  integrations: {
    async findOne(query) {
      return inMemoryStore.integrations.find((item) => {
        if (query.owner && item.owner !== query.owner) return false;
        if (query.provider && item.provider !== query.provider) return false;
        return true;
      }) || null;
    },
    async upsert(query, data) {
      const existing = await this.findOne(query);
      if (existing) {
        Object.assign(existing, data, { updatedAt: new Date() });
        return existing;
      }

      const doc = {
        _id: generateId(),
        ...data,
        owner: query.owner,
        provider: query.provider,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryStore.integrations.push(doc);
      return doc;
    },
  },

  activities: {
    async create(data) {
      const doc = {
        _id: generateId(),
        ...data,
        createdAt: new Date(),
      };
      inMemoryStore.activities.push(doc);
      return doc;
    },
    async find(query = {}) {
      return inMemoryStore.activities.filter((item) => {
        if (query.owner && item.owner !== query.owner) return false;
        if (query.type && item.type !== query.type) return false;
        return true;
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },

  notifications: {
    async create(data) {
      const doc = {
        _id: generateId(),
        ...data,
        read: false,
        createdAt: new Date(),
      };
      inMemoryStore.notifications.push(doc);
      return doc;
    },
    async find(query = {}) {
      return inMemoryStore.notifications.filter((item) => {
        if (query.owner && item.owner !== query.owner) return false;
        return true;
      }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
};

module.exports = { MemoryDB };
