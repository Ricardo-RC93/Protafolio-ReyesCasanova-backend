import { Request, Response, NextFunction } from 'express';
import * as service from '../services/projects.service';
import { successResponse, errorResponse } from '../utils/response';

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isAdmin = !!req.user;
    const data = isAdmin
      ? await service.getAllProjectsAdmin()
      : await service.getAllProjects(req.query.featured as string);
    successResponse(res, data);
  } catch (err) { next(err); }
};

export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isAdmin = !!req.user;
    const project = await service.getProjectById(req.params.id, isAdmin);
    if (!project) { errorResponse(res, 'Project not found', 404); return; }
    successResponse(res, project);
  } catch (err) { next(err); }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await service.createProject(req.body);
    successResponse(res, project, 'Project created', 201);
  } catch (err) { next(err); }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await service.updateProject(req.params.id, req.body);
    if (!project) { errorResponse(res, 'Project not found', 404); return; }
    successResponse(res, project, 'Project updated');
  } catch (err) { next(err); }
};

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await service.deleteProject(req.params.id);
    if (!deleted) { errorResponse(res, 'Project not found', 404); return; }
    successResponse(res, null, 'Project deleted');
  } catch (err) { next(err); }
};

export const addTech = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await service.attachTechnology(req.params.id, req.params.techId);
    if (!result) { errorResponse(res, 'Project or technology not found', 404); return; }
    successResponse(res, null, 'Technology attached');
  } catch (err) { next(err); }
};

export const removeTech = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await service.detachTechnology(req.params.id, req.params.techId);
    if (!result) { errorResponse(res, 'Project or technology not found', 404); return; }
    successResponse(res, null, 'Technology detached');
  } catch (err) { next(err); }
};
