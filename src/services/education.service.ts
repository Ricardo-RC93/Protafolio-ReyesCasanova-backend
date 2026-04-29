import { Education } from '../models';

export const getAll = () =>
  Education.findAll({ order: [['sort_order', 'ASC'], ['start_date', 'DESC']] });

export const getById = (id: string) => Education.findByPk(id);

export const create = (data: Partial<Education>) =>
  Education.create(data as any);

export const update = async (id: string, data: Partial<Education>) => {
  const item = await Education.findByPk(id);
  if (!item) return null;
  return item.update(data);
};

export const remove = async (id: string) => {
  const item = await Education.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
