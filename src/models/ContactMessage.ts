import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ContactMessageAttributes {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  ip_address?: string;
  createdAt?: Date;
}

type ContactMessageCreationAttributes = Optional<ContactMessageAttributes, 'id' | 'is_read'>;

class ContactMessage extends Model<ContactMessageAttributes, ContactMessageCreationAttributes>
  implements ContactMessageAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare subject: string;
  declare message: string;
  declare is_read: boolean;
  declare ip_address?: string;
  declare readonly createdAt: Date;
}

ContactMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { isEmail: true },
    },
    subject: { type: DataTypes.STRING(300), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    ip_address: { type: DataTypes.STRING(45), allowNull: true },
  },
  {
    sequelize,
    tableName: 'contact_messages',
    timestamps: true,
    updatedAt: false,
  }
);

export default ContactMessage;
