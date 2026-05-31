import { Op } from 'sequelize';
import { Testimonial } from '../models';

export const getAll = () =>
  Testimonial.findAll({
    where: {
      is_active: true,
      status: { [Op.or]: ['approved', null] },
    },
    order: [['sort_order', 'ASC']],
  });

export const getAllAdmin = () =>
  Testimonial.findAll({ order: [['createdAt', 'DESC']] });

export const getById = (id: string) => Testimonial.findByPk(id);

export const create = (data: object) =>
  Testimonial.create(data as any);

export const requestTestimonial = (data: object) =>
  Testimonial.create({ ...(data as any), is_active: false, status: 'pending' });

export const approve = async (id: string) => {
  const item = await Testimonial.findByPk(id);
  if (!item) return null;
  return item.update({ status: 'approved', is_active: true });
};

export const reject = async (id: string) => {
  const item = await Testimonial.findByPk(id);
  if (!item) return null;
  return item.update({ status: 'rejected', is_active: false });
};

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
