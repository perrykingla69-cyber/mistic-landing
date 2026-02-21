import { Router } from 'express';
const router = Router();
router.get('/me', (_req, res) => res.json({ role: 'artist', soulScore: 42 }));
export default router;
