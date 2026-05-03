import dotenv from 'dotenv';
dotenv.config();

const hasDatabaseUrl = !!process.env.DATABASE_URL;
const hasIndividualVars =
  process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD;

if (!hasDatabaseUrl && !hasIndividualVars) {
  throw new Error('Missing database config: set DATABASE_URL or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD');
}

if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

export const env = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  dbSsl: process.env.DB_SSL === 'true',
  db: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
    password: process.env.ADMIN_PASSWORD || 'Admin123!',
    username: process.env.ADMIN_USERNAME || 'admin',
  },
};
