import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CVAttributes {
  id: string;
  label_es: string;
  label_en: string;
  file_url: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type CVCreationAttributes = Optional<CVAttributes, 'id' | 'is_active'>;

class CV extends Model<CVAttributes, CVCreationAttributes> implements CVAttributes {
  declare id: string;
  declare label_es: string;
  declare label_en: string;
  declare file_url: string;
  declare is_active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

CV.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    label_es: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'Currículum Vitae' },
    label_en: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'Resume' },
    file_url: { type: DataTypes.STRING(500), allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'cvs', timestamps: true }
);

export default CV;
