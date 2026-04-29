import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProjectAttributes {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  image_url?: string;
  live_url?: string;
  repo_url?: string;
  featured: boolean;
  sort_order: number;
  status: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, 'id' | 'featured' | 'sort_order' | 'status'>;

class Project extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes {
  declare id: string;
  declare title_es: string;
  declare title_en: string;
  declare description_es: string;
  declare description_en: string;
  declare image_url?: string;
  declare live_url?: string;
  declare repo_url?: string;
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
    image_url: { type: DataTypes.STRING(500), allowNull: true },
    live_url: { type: DataTypes.STRING(500), allowNull: true },
    repo_url: { type: DataTypes.STRING(500), allowNull: true },
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
