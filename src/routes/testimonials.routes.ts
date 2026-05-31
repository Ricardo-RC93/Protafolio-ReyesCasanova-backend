import { Router } from 'express';
import * as ctrl from '../controllers/testimonials.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/admin', authMiddleware, ctrl.getAllAdmin);
router.post('/request', ctrl.requestTestimonial);          // público
router.post('/', authMiddleware, ctrl.create);
router.patch('/:id/approve', authMiddleware, ctrl.approve);
router.patch('/:id/reject', authMiddleware, ctrl.reject);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
