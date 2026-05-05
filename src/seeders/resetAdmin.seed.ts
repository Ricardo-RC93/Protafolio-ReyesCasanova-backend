import '../config/env';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/database';
import { AdminUser } from '../models';

const EMAIL = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';
const USERNAME = process.env.ADMIN_USERNAME || 'admin';

const resetAdmin = async (): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const password_hash = await bcrypt.hash(PASSWORD, 12);
  const existing = await AdminUser.findOne({ where: { email: EMAIL } });

  if (existing) {
    await existing.update({ password_hash, username: USERNAME });
    console.log(`Admin updated: ${EMAIL}`);
  } else {
    await AdminUser.create({ username: USERNAME, email: EMAIL, password_hash });
    console.log(`Admin created: ${EMAIL}`);
  }
};

resetAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Reset failed:', err);
    process.exit(1);
  });
