import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ServiceAttributes {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  icon: string;
  features_es?: string[];
  features_en?: string[];
  sort_order: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ServiceCreationAttributes = Optional<ServiceAttributes, 'id' | 'sort_order' | 'is_active'>;

class Service extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes {
  declare id: string;
  declare title_es: string;
  declare title_en: string;
  declare description_es: string;
  declare description_en: string;
  declare icon: string;
  declare features_es?: string[];
  declare features_en?: string[];
  declare sort_order: number;
  declare is_active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Service.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title_es: { type: DataTypes.STRING(200), allowNull: false },
    title_en: { type: DataTypes.STRING(200), allowNull: false },
    description_es: { type: DataTypes.TEXT, allowNull: false },
    description_en: { type: DataTypes.TEXT, allowNull: false },
    icon: { type: DataTypes.STRING(100), allowNull: false },
    features_es: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true, defaultValue: [] },
    features_en: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true, defaultValue: [] },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'services', timestamps: true }
);

export default Service;
