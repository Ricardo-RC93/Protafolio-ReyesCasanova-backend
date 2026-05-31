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

const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/vnd.android.package-archive', // .apk
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream',
      'application/x-rar-compressed',
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.apk', '.zip', '.rar', '.tar', '.gz', '.7z'];
    if (allowed.includes(file.mimetype) || allowedExts.includes(ext)) cb(null, true);
    else cb(new Error('Only APK and archive files are allowed'));
  },
});

const apiBase = process.env.API_URL || 'https://api-protafolio.reyes.richsof.com';

router.post('/', authMiddleware, uploadImage.single('file'), (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json({ message: 'No file uploaded' }); return; }
  const url = `${apiBase}/uploads/${req.file.filename}`;
  res.json({ data: { url } });
});

router.post('/file', authMiddleware, uploadFile.single('file'), (req: Request, res: Response) => {
  if (!req.file) { res.status(400).json({ message: 'No file uploaded' }); return; }
  const url = `${apiBase}/uploads/${req.file.filename}`;
  res.json({ data: { url, filename: req.file.originalname, size: req.file.size } });
});

export default router;
