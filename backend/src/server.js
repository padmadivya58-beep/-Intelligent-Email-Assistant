const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const env = require('./config/env');
const logger = require('./utils/logger');
const { connectDB } = require('./config/db');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Intelligent Email Assistant API',
    version: '1.0.0',
  });
});

async function startServer() {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      logger.info(`Intelligent Email Assistant backend running on port ${env.PORT}`);
      logger.info(`Health: http://localhost:${env.PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Startup failed', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = { app, server };
