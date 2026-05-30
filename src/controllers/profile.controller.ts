import { Request, Response, NextFunction } from 'express';
import * as service from '../services/profile.service';
import { successResponse } from '../utils/response';

export const getPublic = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await service.get();
    successResponse(res, profile);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = await service.upsert(req.body);
    successResponse(res, profile, 'Profile updated');
  } catch (err) { next(err); }
};
