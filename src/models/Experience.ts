import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ExperienceAttributes {
  id: string;
  company: string;
  company_logo?: string;
  company_url?: string;
  position_es: string;
  position_en: string;
  employment_type: 'fulltime' | 'parttime' | 'contract' | 'freelance' | 'internship';
  description_es: string;
  description_en: string;
  achievements_es?: string[];
  achievements_en?: string[];
  technologies?: string[];
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  location?: string;
  sort_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ExperienceCreationAttributes = Optional<ExperienceAttributes, 'id' | 'is_current' | 'sort_order' | 'employment_type'>;

class Experience extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes {
  declare id: string;
  declare company: string;
  declare company_logo?: string;
  declare company_url?: string;
  declare position_es: string;
  declare position_en: string;
  declare employment_type: 'fulltime' | 'parttime' | 'contract' | 'freelance' | 'internship';
  declare description_es: string;
  declare description_en: string;
  declare achievements_es?: string[];
  declare achievements_en?: string[];
  declare technologies?: string[];
  declare start_date: Date;
  declare end_date?: Date;
  declare is_current: boolean;
  declare location?: string;
  declare sort_order: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Experience.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    company: { type: DataTypes.STRING(200), allowNull: false },
    company_logo: { type: DataTypes.STRING(500), allowNull: true },
    company_url: { type: DataTypes.STRING(500), allowNull: true },
    position_es: { type: DataTypes.STRING(200), allowNull: false },
    position_en: { type: DataTypes.STRING(200), allowNull: false },
    employment_type: {
      type: DataTypes.ENUM('fulltime', 'parttime', 'contract', 'freelance', 'internship'),
      defaultValue: 'fulltime',
    },
    description_es: { type: DataTypes.TEXT, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    achievements_es: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true, defaultValue: [] },
    achievements_en: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true, defaultValue: [] },
    technologies: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
    location: { type: DataTypes.STRING(200), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: 'experience',
    timestamps: true,
  }
);

export default Experience;
