const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const routes = require('./routes');
const redis = require('./config/redis');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api', routes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  try {
    await redis.connect();
    console.log('Redis connected');
  } catch (error) {
    console.warn('Redis unavailable, continuing without cache layer', error.message);
  }

  app.listen(env.port, () => {
    console.log(`Backend running on ${env.port}`);
  });
}

start();
