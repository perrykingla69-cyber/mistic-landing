import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => res.json([{ title: 'Curso creativo', commission: '70/30' }]));
export default router;
