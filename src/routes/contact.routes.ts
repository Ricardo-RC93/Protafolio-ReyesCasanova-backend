import { Router } from 'express';
import * as ctrl from '../controllers/contact.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many messages, try again later.' },
});

router.post('/', contactLimiter, ctrl.submit);
router.get('/', authMiddleware, ctrl.getAll);
router.get('/:id', authMiddleware, ctrl.getOne);
router.patch('/:id/read', authMiddleware, ctrl.markRead);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
