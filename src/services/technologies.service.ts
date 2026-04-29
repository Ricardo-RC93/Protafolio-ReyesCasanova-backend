import { Technology } from '../models';

export const getAll = () =>
  Technology.findAll({ order: [['name', 'ASC']] });

export const getById = (id: string) => Technology.findByPk(id);

export const create = (data: Partial<Technology>) =>
  Technology.create(data as any);

export const update = async (id: string, data: Partial<Technology>) => {
  const item = await Technology.findByPk(id);
  if (!item) return null;
  return item.update(data);
};

export const remove = async (id: string) => {
  const item = await Technology.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
