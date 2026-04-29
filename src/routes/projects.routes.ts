import { Router } from 'express';
import * as ctrl from '../controllers/projects.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);
router.post('/:id/technologies/:techId', authMiddleware, ctrl.addTech);
router.delete('/:id/technologies/:techId', authMiddleware, ctrl.removeTech);

export default router;
