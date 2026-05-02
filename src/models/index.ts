import AdminUser from './AdminUser';
import Project from './Project';
import Technology from './Technology';
import ProjectTechnology from './ProjectTechnology';
import Skill from './Skill';
import Experience from './Experience';
import Education from './Education';
import ContactMessage from './ContactMessage';
import CV from './CV';
import Service from './Service';
import Testimonial from './Testimonial';

Project.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: 'project_id',
  otherKey: 'technology_id',
  as: 'technologies',
});

Technology.belongsToMany(Project, {
  through: ProjectTechnology,
  foreignKey: 'technology_id',
  otherKey: 'project_id',
  as: 'projects',
});

export {
  AdminUser,
  Project,
  Technology,
  ProjectTechnology,
  Skill,
  Experience,
  Education,
  ContactMessage,
  CV,
  Service,
  Testimonial,
};
