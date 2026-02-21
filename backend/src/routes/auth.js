import { Router } from 'express';
const router = Router();
router.post('/register', (_req, res) => res.json({ message: 'Registro MVP' }));
router.post('/login', (_req, res) => res.json({ token: 'jwt-demo-token' }));
export default router;
