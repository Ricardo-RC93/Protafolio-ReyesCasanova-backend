import { Router } from 'express';
import * as ctrl from '../controllers/profile.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ctrl.getPublic);
router.put('/', authMiddleware, ctrl.update);

export default router;
