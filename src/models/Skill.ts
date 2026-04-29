import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface SkillAttributes {
  id: string;
  name_es: string;
  name_en: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft' | 'database' | 'devops';
  proficiency: number;
  icon_url?: string;
  sort_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type SkillCreationAttributes = Optional<SkillAttributes, 'id' | 'sort_order'>;

class Skill extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes {
  declare id: string;
  declare name_es: string;
  declare name_en: string;
  declare category: 'frontend' | 'backend' | 'tools' | 'soft' | 'database' | 'devops';
  declare proficiency: number;
  declare icon_url?: string;
  declare sort_order: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name_es: { type: DataTypes.STRING(150), allowNull: false },
    name_en: { type: DataTypes.STRING(150), allowNull: false },
    category: {
      type: DataTypes.ENUM('frontend', 'backend', 'tools', 'soft', 'database', 'devops'),
      allowNull: false,
    },
    proficiency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 100 },
    },
    icon_url: { type: DataTypes.STRING(500), allowNull: true },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: 'skills',
    timestamps: true,
  }
);

export default Skill;
