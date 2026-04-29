import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ExperienceAttributes {
  id: string;
  company: string;
  position_es: string;
  position_en: string;
  description_es: string;
  description_en: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  location?: string;
  company_url?: string;
  sort_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ExperienceCreationAttributes = Optional<ExperienceAttributes, 'id' | 'is_current' | 'sort_order'>;

class Experience extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes {
  declare id: string;
  declare company: string;
  declare position_es: string;
  declare position_en: string;
  declare description_es: string;
  declare description_en: string;
  declare start_date: Date;
  declare end_date?: Date;
  declare is_current: boolean;
  declare location?: string;
  declare company_url?: string;
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
    position_es: { type: DataTypes.STRING(200), allowNull: false },
    position_en: { type: DataTypes.STRING(200), allowNull: false },
    description_es: { type: DataTypes.TEXT, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
    location: { type: DataTypes.STRING(200), allowNull: true },
    company_url: { type: DataTypes.STRING(500), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: 'experience',
    timestamps: true,
  }
);

export default Experience;
