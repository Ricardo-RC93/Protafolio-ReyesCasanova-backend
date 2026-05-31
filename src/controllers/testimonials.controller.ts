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

export const requestTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { author_name, author_company, author_position, content, rating, linkedin_url } = req.body;
    if (!author_name || !author_company || !content) {
      errorResponse(res, 'Nombre, empresa y comentario son requeridos', 400);
      return;
    }
    const item = await service.requestTestimonial({
      author_name,
      author_company,
      author_position_es: author_position || '',
      author_position_en: author_position || '',
      content_es: content,
      content_en: content,
      rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
      linkedin_url: linkedin_url || null,
    });
    successResponse(res, item, 'Testimonio enviado. Será revisado antes de publicarse.', 201);
  } catch (err) { next(err); }
};

export const approve = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.approve(req.params.id);
    if (!item) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, item, 'Aprobado');
  } catch (err) { next(err); }
};

export const reject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await service.reject(req.params.id);
    if (!item) { errorResponse(res, 'Not found', 404); return; }
    successResponse(res, item, 'Rechazado');
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
