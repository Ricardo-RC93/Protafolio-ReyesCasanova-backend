import { Service } from '../models';

export const getAll = () => Service.findAll({ where: { is_active: true }, order: [['sort_order', 'ASC']] });
export const getAllAdmin = () => Service.findAll({ order: [['sort_order', 'ASC']] });
export const getById = (id: string) => Service.findByPk(id);
export const create = (data: object) => Service.create(data as any);
export const update = async (id: string, data: object) => {
  const item = await Service.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
export const remove = async (id: string) => {
  const item = await Service.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
