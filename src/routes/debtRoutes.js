import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { createDebt, getDebts, updateDebt, deleteDebt, payDebt, exportDebts, summaryDebts } from '../controllers/debtController.js';

const router = Router();

router.use(auth);
router.post('/', createDebt);
router.get('/', getDebts);
router.put('/:id', updateDebt);
router.delete('/:id', deleteDebt);
router.patch('/:id/pay', payDebt);
router.get('/export', exportDebts);
router.get('/summary', summaryDebts);

export default router;
