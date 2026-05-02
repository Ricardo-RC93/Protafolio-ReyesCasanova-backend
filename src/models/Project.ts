import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProjectAttributes {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  short_description_es?: string;
  short_description_en?: string;
  image_url?: string;
  images?: string[];
  live_url?: string;
  repo_url?: string;
  demo_video_url?: string;
  category: 'web' | 'mobile' | 'fullstack' | 'other';
  role_es?: string;
  role_en?: string;
  duration?: string;
  challenges_es?: string;
  challenges_en?: string;
  solutions_es?: string;
  solutions_en?: string;
  featured: boolean;
  sort_order: number;
  status: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, 'id' | 'featured' | 'sort_order' | 'status' | 'category'>;

class Project extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes {
  declare id: string;
  declare title_es: string;
  declare title_en: string;
  declare description_es: string;
  declare description_en: string;
  declare short_description_es?: string;
  declare short_description_en?: string;
  declare image_url?: string;
  declare images?: string[];
  declare live_url?: string;
  declare repo_url?: string;
  declare demo_video_url?: string;
  declare category: 'web' | 'mobile' | 'fullstack' | 'other';
  declare role_es?: string;
  declare role_en?: string;
  declare duration?: string;
  declare challenges_es?: string;
  declare challenges_en?: string;
  declare solutions_es?: string;
  declare solutions_en?: string;
  declare featured: boolean;
  declare sort_order: number;
  declare status: 'published' | 'draft';
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title_es: { type: DataTypes.STRING(200), allowNull: false },
    title_en: { type: DataTypes.STRING(200), allowNull: false },
    description_es: { type: DataTypes.TEXT, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    short_description_es: { type: DataTypes.STRING(300), allowNull: true },
    short_description_en: { type: DataTypes.STRING(300), allowNull: true },
    image_url: { type: DataTypes.STRING(500), allowNull: true },
    images: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true, defaultValue: [] },
    live_url: { type: DataTypes.STRING(500), allowNull: true },
    repo_url: { type: DataTypes.STRING(500), allowNull: true },
    demo_video_url: { type: DataTypes.STRING(500), allowNull: true },
    category: {
      type: DataTypes.ENUM('web', 'mobile', 'fullstack', 'other'),
      defaultValue: 'web',
    },
    role_es: { type: DataTypes.STRING(200), allowNull: true },
    role_en: { type: DataTypes.STRING(200), allowNull: true },
    duration: { type: DataTypes.STRING(100), allowNull: true },
    challenges_es: { type: DataTypes.TEXT, allowNull: true },
    challenges_en: { type: DataTypes.TEXT, allowNull: true },
    solutions_es: { type: DataTypes.TEXT, allowNull: true },
    solutions_en: { type: DataTypes.TEXT, allowNull: true },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM('published', 'draft'),
      defaultValue: 'published',
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
  }
);

export default Project;
