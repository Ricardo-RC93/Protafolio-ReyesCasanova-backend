import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class ProjectTechnology extends Model {}

ProjectTechnology.init(
  {
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'projects', key: 'id' },
      onDelete: 'CASCADE',
    },
    technology_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'technologies', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'project_technologies',
    timestamps: false,
  }
);

export default ProjectTechnology;
