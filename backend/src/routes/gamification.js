import { Router } from 'express';
const router = Router();
router.get('/missions', (_req, res) => res.json([{ id: 1, title: 'Completa tu perfil', points: 100 }]));
export default router;
