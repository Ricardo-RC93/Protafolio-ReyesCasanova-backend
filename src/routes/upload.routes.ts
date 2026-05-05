import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middleware/auth.middleware';
import { env } from '../config/env';

const router = Router();

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

router.post('/', authMiddleware, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json({ message: 'No file uploaded' }); return; }
  const baseUrl = env.frontendUrl.replace('portafolio', 'api-protafolio');
  const url = `${process.env.API_URL || `https://api-protafolio.reyes.richsof.com`}/uploads/${req.file.filename}`;
  res.json({ data: { url } });
});

export default router;
