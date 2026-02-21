import { Router } from 'express';
import { splitCommission } from '../utils/payment.js';

const router = Router();

router.get('/', (_req, res) => {
  const products = [
    { title: 'Curso creativo', category: 'course', commission: splitCommission(1000) },
    { title: 'Playera edición limitada', category: 'merch', commission: splitCommission(1000, 'merch') }
  ];
  res.json(products);
});

export default router;
