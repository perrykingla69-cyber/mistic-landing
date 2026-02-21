import { Router } from 'express';
const router = Router();
router.get('/checklist', (_req, res) => res.json({ fiscal: true, contracts: true }));
export default router;
