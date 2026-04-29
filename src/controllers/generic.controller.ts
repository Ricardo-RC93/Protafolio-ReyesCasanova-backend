import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '../utils/response';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Service = {
  getAll: (param?: string) => Promise<any[]>;
  getById: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  remove: (id: string) => Promise<boolean>;
};

export const makeController = (service: Service) => ({
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await service.getAll();
      successResponse(res, data);
    } catch (err) { next(err); }
  },

  getOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await service.getById(req.params.id);
      if (!item) { errorResponse(res, 'Not found', 404); return; }
      successResponse(res, item);
    } catch (err) { next(err); }
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await service.create(req.body);
      successResponse(res, item, 'Created', 201);
    } catch (err) { next(err); }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const item = await service.update(req.params.id, req.body);
      if (!item) { errorResponse(res, 'Not found', 404); return; }
      successResponse(res, item, 'Updated');
    } catch (err) { next(err); }
  },

  remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleted = await service.remove(req.params.id);
      if (!deleted) { errorResponse(res, 'Not found', 404); return; }
      successResponse(res, null, 'Deleted');
    } catch (err) { next(err); }
  },
});
