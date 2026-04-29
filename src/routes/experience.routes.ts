import { Router } from 'express';
import { makeController } from '../controllers/generic.controller';
import * as service from '../services/experience.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const ctrl = makeController(service);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
