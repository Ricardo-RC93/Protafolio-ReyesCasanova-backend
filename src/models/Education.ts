import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface EducationAttributes {
  id: string;
  institution: string;
  degree_es: string;
  degree_en: string;
  field_es?: string;
  field_en?: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  gpa?: number;
  institution_url?: string;
  sort_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type EducationCreationAttributes = Optional<EducationAttributes, 'id' | 'is_current' | 'sort_order'>;

class Education extends Model<EducationAttributes, EducationCreationAttributes>
  implements EducationAttributes {
  declare id: string;
  declare institution: string;
  declare degree_es: string;
  declare degree_en: string;
  declare field_es?: string;
  declare field_en?: string;
  declare start_date: Date;
  declare end_date?: Date;
  declare is_current: boolean;
  declare gpa?: number;
  declare institution_url?: string;
  declare sort_order: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Education.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    institution: { type: DataTypes.STRING(200), allowNull: false },
    degree_es: { type: DataTypes.STRING(200), allowNull: false },
    degree_en: { type: DataTypes.STRING(200), allowNull: false },
    field_es: { type: DataTypes.STRING(200), allowNull: true },
    field_en: { type: DataTypes.STRING(200), allowNull: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: true },
    is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
    gpa: { type: DataTypes.DECIMAL(3, 2), allowNull: true },
    institution_url: { type: DataTypes.STRING(500), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: 'education',
    timestamps: true,
  }
);

export default Education;
