import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface AdminUserAttributes {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminUserCreationAttributes = Optional<AdminUserAttributes, 'id'>;

class AdminUser extends Model<AdminUserAttributes, AdminUserCreationAttributes>
  implements AdminUserAttributes {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password_hash: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AdminUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'admin_users',
    timestamps: true,
  }
);

export default AdminUser;
