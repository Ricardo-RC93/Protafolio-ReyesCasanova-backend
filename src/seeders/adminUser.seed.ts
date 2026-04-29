import '../config/env';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/database';
import { AdminUser } from '../models';
import { env } from '../config/env';

const seedAdmin = async (): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const existing = await AdminUser.findOne({ where: { email: env.admin.email } });
  if (existing) {
    console.log('Admin user already exists, skipping seed.');
    return;
  }

  const password_hash = await bcrypt.hash(env.admin.password, 12);
  await AdminUser.create({
    username: env.admin.username,
    email: env.admin.email,
    password_hash,
  });

  console.log(`Admin created: ${env.admin.email}`);
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
