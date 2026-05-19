import { Technology } from '../models';

const sanitize = (data: Record<string, unknown>) => ({
  ...data,
  icon_url: data.icon_url || null,
  color: data.color || null,
});

export const getAll = () =>
  Technology.findAll({ order: [['name', 'ASC']] });

export const getById = (id: string) => Technology.findByPk(id);

export const create = (data: Partial<Technology>) =>
  Technology.create(sanitize(data as Record<string, unknown>) as any);

export const update = async (id: string, data: Partial<Technology>) => {
  const item = await Technology.findByPk(id);
  if (!item) return null;
  return item.update(sanitize(data as Record<string, unknown>) as any);
};

export const remove = async (id: string) => {
  const item = await Technology.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
