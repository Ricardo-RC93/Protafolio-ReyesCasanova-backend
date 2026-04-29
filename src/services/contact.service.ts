import { ContactMessage } from '../models';

export const create = (data: {
  name: string; email: string; subject: string; message: string; ip_address?: string;
}) => ContactMessage.create(data);

export const getAll = () =>
  ContactMessage.findAll({ order: [['createdAt', 'DESC']] });

export const getById = (id: string) => ContactMessage.findByPk(id);

export const markAsRead = async (id: string) => {
  const item = await ContactMessage.findByPk(id);
  if (!item) return null;
  return item.update({ is_read: true });
};

export const remove = async (id: string) => {
  const item = await ContactMessage.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
};
