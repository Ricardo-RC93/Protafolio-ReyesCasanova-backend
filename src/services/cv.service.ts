import { CV } from '../models';

export const getActive = () => CV.findOne({ where: { is_active: true } });
export const getAll = () => CV.findAll({ order: [['createdAt', 'DESC']] });
export const getById = (id: string) => CV.findByPk(id);
export const create = (data: object) => CV.create(data as any);
export const update = async (id: string, data: object) => {
  const item = await CV.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
export const remove = async (id: string) => {
  const item = await CV.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
