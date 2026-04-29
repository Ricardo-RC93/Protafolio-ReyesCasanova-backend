import bcrypt from 'bcrypt';
import { AdminUser } from '../models';
import { signToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const loginService = async (email: string, password: string) => {
  const user = await AdminUser.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const payload = { sub: user.id, email: user.email };
  const token = signToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { token, refreshToken, user: { id: user.id, username: user.username, email: user.email } };
};

export const refreshService = (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const token = signToken({ sub: payload.sub, email: payload.email });
  return { token };
};

export const getMeService = async (userId: string) => {
  const user = await AdminUser.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'createdAt'],
  });
  if (!user) throw new Error('User not found');
  return user;
};
