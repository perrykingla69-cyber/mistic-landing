import { Router } from 'express';
const router = Router();
router.get('/plans', (_req, res) => res.json(['basic', 'pro', 'elite']));
export default router;
