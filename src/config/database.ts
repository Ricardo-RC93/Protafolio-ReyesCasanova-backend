import { Sequelize } from 'sequelize';
import { env } from './env';

const sslOptions = env.dbSsl
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {};

export const sequelize = env.databaseUrl
  ? new Sequelize(env.databaseUrl, {
      dialect: 'postgres',
      logging: env.nodeEnv === 'development' ? console.log : false,
      dialectOptions: sslOptions,
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    })
  : new Sequelize(env.db.name, env.db.user, env.db.password, {
      host: env.db.host,
      port: env.db.port,
      dialect: 'postgres',
      logging: env.nodeEnv === 'development' ? console.log : false,
      dialectOptions: sslOptions,
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    });

export const connectDB = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log('PostgreSQL connected successfully.');
};
