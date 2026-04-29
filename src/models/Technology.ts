import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface TechnologyAttributes {
  id: string;
  name: string;
  icon_url?: string;
  color?: string;
  createdAt?: Date;
}

type TechnologyCreationAttributes = Optional<TechnologyAttributes, 'id'>;

class Technology extends Model<TechnologyAttributes, TechnologyCreationAttributes>
  implements TechnologyAttributes {
  declare id: string;
  declare name: string;
  declare icon_url?: string;
  declare color?: string;
  declare readonly createdAt: Date;
}

Technology.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    icon_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'technologies',
    timestamps: true,
    updatedAt: false,
  }
);

export default Technology;
