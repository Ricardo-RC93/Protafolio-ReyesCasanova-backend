import { Router } from 'express';
import authRoutes from './auth.routes';
import projectsRoutes from './projects.routes';
import skillsRoutes from './skills.routes';
import experienceRoutes from './experience.routes';
import educationRoutes from './education.routes';
import technologiesRoutes from './technologies.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/skills', skillsRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/technologies', technologiesRoutes);
router.use('/contact', contactRoutes);

export default router;
