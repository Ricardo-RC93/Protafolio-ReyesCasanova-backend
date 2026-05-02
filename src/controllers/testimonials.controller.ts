import { Request, Response, NextFunction } from 'express';
import * as service from '../services/testimonials.service';
import { successResponse, errorResponse } from '../utils/response';

export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try { successResponse(res, await service.getAll()); } catch (err) { next(err); }
};

export const getAllAdmin = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try { successResponse(res, await service.getAllAdmin()); } catch (err) { next(err); }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.create(req.body);
    successResponse(res, item, 'Testimonial created', 201);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, item, 'Testimonial updated');
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, null, 'Deleted');
  } catch (err) { next(err); }
};
