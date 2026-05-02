import { Router } from 'express';
import * as ctrl from '../controllers/cv.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/active', ctrl.getActive);
router.get('/', authMiddleware, ctrl.getAll);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
