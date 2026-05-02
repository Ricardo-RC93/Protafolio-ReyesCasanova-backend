import { Testimonial } from '../models';

export const getAll = () => Testimonial.findAll({ where: { is_active: true }, order: [['sort_order', 'ASC']] });
export const getAllAdmin = () => Testimonial.findAll({ order: [['sort_order', 'ASC']] });
export const getById = (id: string) => Testimonial.findByPk(id);
export const create = (data: object) => Testimonial.create(data as any);
export const update = async (id: string, data: object) => {
  const item = await Testimonial.findByPk(id);
  if (!item) return null;
  return item.update(data);
};
export const remove = async (id: string) => {
  const item = await Testimonial.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
