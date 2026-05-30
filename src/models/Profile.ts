import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProfileAttributes {
  id: string;
  name: string;
  role_es: string;
  role_en: string;
  bio_es: string;
  bio_en: string;
  about_title_es: string;
  about_title_en: string;
  about_subtitle_es: string;
  about_subtitle_en: string;
  location: string;
  available_for_work: boolean;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  avatar_url?: string;
  years_experience: string;
  projects_count: string;
  technologies_count: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProfileCreationAttributes = Optional<
  ProfileAttributes,
  'id' | 'available_for_work' | 'years_experience' | 'projects_count' | 'technologies_count'
>;

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes {
  declare id: string;
  declare name: string;
  declare role_es: string;
  declare role_en: string;
  declare bio_es: string;
  declare bio_en: string;
  declare about_title_es: string;
  declare about_title_en: string;
  declare about_subtitle_es: string;
  declare about_subtitle_en: string;
  declare location: string;
  declare available_for_work: boolean;
  declare github_url?: string;
  declare linkedin_url?: string;
  declare website_url?: string;
  declare avatar_url?: string;
  declare years_experience: string;
  declare projects_count: string;
  declare technologies_count: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Profile.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    role_es: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    role_en: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    bio_es: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    bio_en: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    about_title_es: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'Sobre mí' },
    about_title_en: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'About Me' },
    about_subtitle_es: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    about_subtitle_en: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    location: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    available_for_work: { type: DataTypes.BOOLEAN, defaultValue: true },
    github_url: { type: DataTypes.STRING(500), allowNull: true },
    linkedin_url: { type: DataTypes.STRING(500), allowNull: true },
    website_url: { type: DataTypes.STRING(500), allowNull: true },
    avatar_url: { type: DataTypes.STRING(500), allowNull: true },
    years_experience: { type: DataTypes.STRING(20), defaultValue: '0' },
    projects_count: { type: DataTypes.STRING(20), defaultValue: '0' },
    technologies_count: { type: DataTypes.STRING(20), defaultValue: '0' },
  },
  { sequelize, tableName: 'profile', timestamps: true }
);

export default Profile;
