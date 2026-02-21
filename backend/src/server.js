import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import membershipRoutes from './routes/memberships.js';
import projectRoutes from './routes/projects.js';
import productRoutes from './routes/products.js';
import legalRoutes from './routes/legal.js';
import gamificationRoutes from './routes/gamification.js';
import communityRoutes from './routes/community.js';
import aiAppsRoutes from './routes/ai-apps.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', platform: 'Sonora Mystic Corp API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/memberships', membershipRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/legal', legalRoutes);
app.use('/api/v1/gamification', gamificationRoutes);
app.use('/api/v1/community', communityRoutes);
app.use('/api/v1/ai-apps', aiAppsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sonora Mystic backend running on port ${PORT}`);
});
