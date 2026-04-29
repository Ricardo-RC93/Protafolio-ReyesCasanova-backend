import { Skill } from '../models';

export const getAll = (category?: string) =>
  Skill.findAll({
    where: category ? { category } : {},
    order: [['sort_order', 'ASC'], ['name_en', 'ASC']],
  });

export const getById = (id: string) => Skill.findByPk(id);

export const create = (data: Partial<Skill>) =>
  Skill.create(data as any);

export const update = async (id: string, data: Partial<Skill>) => {
  const item = await Skill.findByPk(id);
  if (!item) return null;
  return item.update(data);
};

export const remove = async (id: string) => {
  const item = await Skill.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
