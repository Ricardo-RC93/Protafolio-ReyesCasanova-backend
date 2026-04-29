import { Experience } from '../models';

export const getAll = () =>
  Experience.findAll({ order: [['sort_order', 'ASC'], ['start_date', 'DESC']] });

export const getById = (id: string) => Experience.findByPk(id);

export const create = (data: Partial<Experience>) =>
  Experience.create(data as any);

export const update = async (id: string, data: Partial<Experience>) => {
  const item = await Experience.findByPk(id);
  if (!item) return null;
  return item.update(data);
};

export const remove = async (id: string) => {
  const item = await Experience.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
