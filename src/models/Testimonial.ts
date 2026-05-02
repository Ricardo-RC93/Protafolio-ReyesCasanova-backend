import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface TestimonialAttributes {
  id: string;
  author_name: string;
  author_position_es: string;
  author_position_en: string;
  author_company: string;
  author_avatar?: string;
  content_es: string;
  content_en: string;
  rating: number;
  sort_order: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type TestimonialCreationAttributes = Optional<TestimonialAttributes, 'id' | 'sort_order' | 'is_active' | 'rating'>;

class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes>
  implements TestimonialAttributes {
  declare id: string;
  declare author_name: string;
  declare author_position_es: string;
  declare author_position_en: string;
  declare author_company: string;
  declare author_avatar?: string;
  declare content_es: string;
  declare content_en: string;
  declare rating: number;
  declare sort_order: number;
  declare is_active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Testimonial.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    author_name: { type: DataTypes.STRING(200), allowNull: false },
    author_position_es: { type: DataTypes.STRING(200), allowNull: false },
    author_position_en: { type: DataTypes.STRING(200), allowNull: false },
    author_company: { type: DataTypes.STRING(200), allowNull: false },
    author_avatar: { type: DataTypes.STRING(500), allowNull: true },
    content_es: { type: DataTypes.TEXT, allowNull: false },
    content_en: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5, validate: { min: 1, max: 5 } },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'testimonials', timestamps: true }
);

export default Testimonial;
