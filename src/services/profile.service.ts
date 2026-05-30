import { Profile } from '../models';

export const get = () => Profile.findOne();

export const upsert = async (data: object) => {
  const existing = await Profile.findOne();
  if (existing) return existing.update(data);
  return Profile.create(data as any);
};
