import { Request, Response, NextFunction } from 'express';
import { loginService, refreshService, getMeService } from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';
import { env } from '../config/env';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      errorResponse(res, 'Email and password are required', 400);
      return;
    }
    const result = await loginService(email, password);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    successResponse(res, { token: result.token, user: result.user }, 'Login successful');
  } catch (err) {
    if (err instanceof Error && err.message === 'Invalid credentials') {
      errorResponse(res, 'Invalid credentials', 401);
    } else {
      next(err);
    }
  }
};

export const refresh = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      errorResponse(res, 'No refresh token', 401);
      return;
    }
    const result = refreshService(refreshToken);
    successResponse(res, result, 'Token refreshed');
  } catch {
    errorResponse(res, 'Invalid refresh token', 401);
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('refreshToken');
  successResponse(res, null, 'Logged out');
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getMeService(req.user!.sub);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};
