import { Request, Response, NextFunction } from 'express';
import * as service from '../services/contact.service';
import { successResponse, errorResponse } from '../utils/response';

export const submit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      errorResponse(res, 'All fields are required', 400);
      return;
    }
    const ip_address = (req.ip || req.socket.remoteAddress || '').substring(0, 45);
    const item = await service.create({ name, email, subject, message, ip_address });
    successResponse(res, item, 'Message sent', 201);
  } catch (err) { next(err); }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await service.getAll();
    successResponse(res, data);
  } catch (err) { next(err); }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, item);
  } catch (err) { next(err); }
};

export const markRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.markAsRead(req.params.id);
    if (!item) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, item, 'Marked as read');
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, null, 'Deleted');
  } catch (err) { next(err); }
};
