import { Router } from 'express';
import authRoutes from './auth.routes';
import projectsRoutes from './projects.routes';
import skillsRoutes from './skills.routes';
import experienceRoutes from './experience.routes';
import educationRoutes from './education.routes';
import technologiesRoutes from './technologies.routes';
import contactRoutes from './contact.routes';
import cvRoutes from './cv.routes';
import servicesRoutes from './services.routes';
import testimonialsRoutes from './testimonials.routes';
import uploadRoutes from './upload.routes';
import profileRoutes from './profile.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/upload', uploadRoutes);
router.use('/skills', skillsRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/technologies', technologiesRoutes);
router.use('/contact', contactRoutes);
router.use('/cv', cvRoutes);
router.use('/services', servicesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/profile', profileRoutes);

export default router;
