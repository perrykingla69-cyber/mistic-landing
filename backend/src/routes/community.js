import { Router } from 'express';
const router = Router();
router.get('/forums', (_req, res) => res.json([{ id: 1, name: 'Foro Emprendedores Creativos' }]));
export default router;
