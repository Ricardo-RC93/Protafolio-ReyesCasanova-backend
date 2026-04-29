import { Project, Technology } from '../models';

const publicWhere = { status: 'published' };

export const getAllProjects = async (featured?: string) => {
  const where: Record<string, unknown> = { status: 'published' };
  if (featured === 'true') where.featured = true;
  return Project.findAll({
    where,
    include: [{ model: Technology, as: 'technologies', through: { attributes: [] } }],
    order: [['sort_order', 'ASC'], ['createdAt', 'DESC']],
  });
};

export const getAllProjectsAdmin = async () => {
  return Project.findAll({
    include: [{ model: Technology, as: 'technologies', through: { attributes: [] } }],
    order: [['sort_order', 'ASC'], ['createdAt', 'DESC']],
  });
};

export const getProjectById = async (id: string, adminView = false) => {
  const where = adminView ? { id } : { id, ...publicWhere };
  return Project.findOne({
    where,
    include: [{ model: Technology, as: 'technologies', through: { attributes: [] } }],
  });
};

export const createProject = async (data: Partial<Project>) => {
  return Project.create(data as any);
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const project = await Project.findByPk(id);
  if (!project) return null;
  return project.update(data);
};

export const deleteProject = async (id: string) => {
  const project = await Project.findByPk(id);
  if (!project) return false;
  await project.destroy();
  return true;
};

export const attachTechnology = async (projectId: string, technologyId: string) => {
  const project = await Project.findByPk(projectId);
  if (!project) return null;
  const tech = await Technology.findByPk(technologyId);
  if (!tech) return null;
  await (project as unknown as { addTechnology: (t: Technology) => Promise<void> }).addTechnology(tech);
  return project;
};

export const detachTechnology = async (projectId: string, technologyId: string) => {
  const project = await Project.findByPk(projectId);
  if (!project) return null;
  const tech = await Technology.findByPk(technologyId);
  if (!tech) return null;
  await (project as unknown as { removeTechnology: (t: Technology) => Promise<void> }).removeTechnology(tech);
  return project;
};
