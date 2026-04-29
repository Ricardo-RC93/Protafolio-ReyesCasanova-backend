import './config/env';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { connectDB, sequelize } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: env.frontendUrl,
  credentials: true,
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', router);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectDB();
    await sequelize.sync({ alter: env.nodeEnv === 'development' });
    console.log('Database synced.');
    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();

export default app;
