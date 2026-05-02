import '../config/env';
import { sequelize } from '../config/database';
import Skill from '../models/Skill';
import Service from '../models/Service';
import Testimonial from '../models/Testimonial';
import Experience from '../models/Experience';
import Project from '../models/Project';

const seedPortfolio = async (): Promise<void> => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  // ── SKILLS ──────────────────────────────────────────────────────────────────
  const skillCount = await Skill.count();
  if (skillCount === 0) {
    await Skill.bulkCreate([
      // ── Frontend ──
      { name_es: 'HTML5 & CSS3',    name_en: 'HTML5 & CSS3',    category: 'frontend', proficiency: 98, color: '#E34F26', is_highlighted: false, sort_order: 1 },
      { name_es: 'JavaScript ES6+', name_en: 'JavaScript ES6+', category: 'frontend', proficiency: 95, color: '#F7DF1E', is_highlighted: true,  sort_order: 2 },
      { name_es: 'TypeScript',      name_en: 'TypeScript',      category: 'frontend', proficiency: 92, color: '#3178C6', is_highlighted: true,  sort_order: 3 },
      { name_es: 'React',           name_en: 'React',           category: 'frontend', proficiency: 95, color: '#61DAFB', is_highlighted: true,  sort_order: 4 },
      { name_es: 'Next.js',         name_en: 'Next.js',         category: 'frontend', proficiency: 92, color: '#000000', is_highlighted: true,  sort_order: 5 },
      { name_es: 'Vue.js',          name_en: 'Vue.js',          category: 'frontend', proficiency: 78, color: '#42B883', is_highlighted: false, sort_order: 6 },
      { name_es: 'Angular',         name_en: 'Angular',         category: 'frontend', proficiency: 70, color: '#DD0031', is_highlighted: false, sort_order: 7 },
      { name_es: 'Tailwind CSS',    name_en: 'Tailwind CSS',    category: 'frontend', proficiency: 95, color: '#06B6D4', is_highlighted: true,  sort_order: 8 },
      { name_es: 'Redux',           name_en: 'Redux',           category: 'frontend', proficiency: 82, color: '#764ABC', is_highlighted: false, sort_order: 9 },
      { name_es: 'Diseño Responsivo', name_en: 'Responsive Design', category: 'frontend', proficiency: 97, color: '#0EA5E9', is_highlighted: false, sort_order: 10 },
      { name_es: 'Framer Motion',   name_en: 'Framer Motion',   category: 'frontend', proficiency: 80, color: '#FF0055', is_highlighted: false, sort_order: 11 },

      // ── Backend ──
      { name_es: 'Node.js',   name_en: 'Node.js',   category: 'backend', proficiency: 93, color: '#339933', is_highlighted: true,  sort_order: 1 },
      { name_es: 'Express',   name_en: 'Express',   category: 'backend', proficiency: 92, color: '#404D59', is_highlighted: true,  sort_order: 2 },
      { name_es: 'NestJS',    name_en: 'NestJS',    category: 'backend', proficiency: 82, color: '#E0234E', is_highlighted: true,  sort_order: 3 },
      { name_es: 'Python',    name_en: 'Python',    category: 'backend', proficiency: 76, color: '#3776AB', is_highlighted: false, sort_order: 4 },
      { name_es: 'PHP',       name_en: 'PHP',       category: 'backend', proficiency: 72, color: '#777BB4', is_highlighted: false, sort_order: 5 },
      { name_es: 'REST APIs', name_en: 'REST APIs', category: 'backend', proficiency: 96, color: '#009688', is_highlighted: false, sort_order: 6 },
      { name_es: 'GraphQL',   name_en: 'GraphQL',   category: 'backend', proficiency: 72, color: '#E10098', is_highlighted: false, sort_order: 7 },

      // ── Mobile ──
      { name_es: 'React Native', name_en: 'React Native', category: 'mobile', proficiency: 90, color: '#61DAFB', is_highlighted: true,  sort_order: 1 },
      { name_es: 'Expo',         name_en: 'Expo',         category: 'mobile', proficiency: 87, color: '#000020', is_highlighted: true,  sort_order: 2 },
      { name_es: 'Flutter',      name_en: 'Flutter',      category: 'mobile', proficiency: 65, color: '#02569B', is_highlighted: false, sort_order: 3 },

      // ── Databases ──
      { name_es: 'PostgreSQL', name_en: 'PostgreSQL', category: 'database', proficiency: 88, color: '#336791', is_highlighted: true,  sort_order: 1 },
      { name_es: 'MongoDB',    name_en: 'MongoDB',    category: 'database', proficiency: 84, color: '#47A248', is_highlighted: true,  sort_order: 2 },
      { name_es: 'MySQL',      name_en: 'MySQL',      category: 'database', proficiency: 82, color: '#4479A1', is_highlighted: false, sort_order: 3 },
      { name_es: 'Redis',      name_en: 'Redis',      category: 'database', proficiency: 75, color: '#DC382D', is_highlighted: false, sort_order: 4 },

      // ── DevOps ──
      { name_es: 'Git & GitHub',    name_en: 'Git & GitHub',    category: 'devops', proficiency: 95, color: '#F05032', is_highlighted: true,  sort_order: 1 },
      { name_es: 'Docker',          name_en: 'Docker',          category: 'devops', proficiency: 83, color: '#2496ED', is_highlighted: true,  sort_order: 2 },
      { name_es: 'CI/CD',           name_en: 'CI/CD',           category: 'devops', proficiency: 76, color: '#4CAF50', is_highlighted: false, sort_order: 3 },
      { name_es: 'Linux / Terminal', name_en: 'Linux / Terminal', category: 'devops', proficiency: 80, color: '#FCC624', is_highlighted: false, sort_order: 4 },
      { name_es: 'AWS',             name_en: 'AWS',             category: 'devops', proficiency: 68, color: '#FF9900', is_highlighted: false, sort_order: 5 },
      { name_es: 'Vercel / Netlify', name_en: 'Vercel / Netlify', category: 'devops', proficiency: 90, color: '#000000', is_highlighted: false, sort_order: 6 },

      // ── Tools ──
      { name_es: 'VS Code',  name_en: 'VS Code',  category: 'tools', proficiency: 98, color: '#007ACC', is_highlighted: false, sort_order: 1 },
      { name_es: 'Figma',    name_en: 'Figma',    category: 'tools', proficiency: 74, color: '#F24E1E', is_highlighted: false, sort_order: 2 },
      { name_es: 'Postman',  name_en: 'Postman',  category: 'tools', proficiency: 92, color: '#FF6C37', is_highlighted: false, sort_order: 3 },
      { name_es: 'SEO Técnico', name_en: 'Technical SEO', category: 'tools', proficiency: 78, color: '#34A853', is_highlighted: false, sort_order: 4 },
      { name_es: 'UX / UI',  name_en: 'UX / UI',  category: 'tools', proficiency: 72, color: '#A855F7', is_highlighted: false, sort_order: 5 },
      { name_es: 'Seguridad Web', name_en: 'Web Security', category: 'tools', proficiency: 75, color: '#EF4444', is_highlighted: false, sort_order: 6 },

      // ── Soft Skills ──
      { name_es: 'Resolución de Problemas', name_en: 'Problem Solving',     category: 'soft', proficiency: 95, color: '#0EA5E9', is_highlighted: true,  sort_order: 1 },
      { name_es: 'Trabajo en Equipo',       name_en: 'Teamwork',            category: 'soft', proficiency: 92, color: '#10B981', is_highlighted: false, sort_order: 2 },
      { name_es: 'Aprendizaje Continuo',    name_en: 'Continuous Learning', category: 'soft', proficiency: 98, color: '#F59E0B', is_highlighted: false, sort_order: 3 },
      { name_es: 'Atención al Detalle',     name_en: 'Attention to Detail', category: 'soft', proficiency: 93, color: '#8B5CF6', is_highlighted: false, sort_order: 4 },
      { name_es: 'Comunicación',            name_en: 'Communication',       category: 'soft', proficiency: 90, color: '#EC4899', is_highlighted: false, sort_order: 5 },
    ]);
    console.log('✓ Skills seeded (42 skills)');
  } else {
    console.log('· Skills already exist, skipping');
  }

  // ── SERVICES ────────────────────────────────────────────────────────────────
  const serviceCount = await Service.count();
  if (serviceCount === 0) {
    await Service.bulkCreate([
      {
        title_es: 'Desarrollo Web',
        title_en: 'Web Development',
        description_es: 'Aplicaciones web modernas, rápidas y escalables con React, Next.js y TypeScript. Desde landing pages hasta plataformas SaaS completas.',
        description_en: 'Modern, fast and scalable web applications with React, Next.js and TypeScript. From landing pages to full SaaS platforms.',
        icon: 'monitor',
        features_es: ['React / Next.js', 'TypeScript + Tailwind', 'SEO optimizado', 'Responsive design', 'Performance 90+ Lighthouse'],
        features_en: ['React / Next.js', 'TypeScript + Tailwind', 'Optimized SEO', 'Responsive design', 'Performance 90+ Lighthouse'],
        sort_order: 1, is_active: true,
      },
      {
        title_es: 'Apps Móviles',
        title_en: 'Mobile Apps',
        description_es: 'Aplicaciones iOS y Android con React Native y Expo. Una sola base de código, experiencia nativa en ambas plataformas.',
        description_en: 'iOS and Android apps with React Native and Expo. One codebase, native experience on both platforms.',
        icon: 'smartphone',
        features_es: ['React Native + Expo', 'iOS & Android', 'Notificaciones push', 'Offline support', 'Publicación en stores'],
        features_en: ['React Native + Expo', 'iOS & Android', 'Push notifications', 'Offline support', 'Store publishing'],
        sort_order: 2, is_active: true,
      },
      {
        title_es: 'Backend & APIs',
        title_en: 'Backend & APIs',
        description_es: 'APIs REST robustas con Node.js, Express y NestJS. Autenticación segura, base de datos optimizada y arquitectura escalable.',
        description_en: 'Robust REST APIs with Node.js, Express and NestJS. Secure authentication, optimized database and scalable architecture.',
        icon: 'server',
        features_es: ['Node.js / NestJS', 'PostgreSQL / MongoDB', 'JWT + OAuth2', 'Documentación Swagger', 'Rate limiting & seguridad'],
        features_en: ['Node.js / NestJS', 'PostgreSQL / MongoDB', 'JWT + OAuth2', 'Swagger docs', 'Rate limiting & security'],
        sort_order: 3, is_active: true,
      },
      {
        title_es: 'E-Commerce',
        title_en: 'E-Commerce',
        description_es: 'Tiendas online completas con carrito, pagos, panel de administración e inventario. Integración con Stripe, PayPal y pasarelas locales.',
        description_en: 'Complete online stores with cart, payments, admin panel and inventory. Integration with Stripe, PayPal and local gateways.',
        icon: 'shopping',
        features_es: ['Carrito y checkout', 'Stripe / PayPal', 'Panel de admin', 'Gestión de inventario', 'Reportes de ventas'],
        features_en: ['Cart and checkout', 'Stripe / PayPal', 'Admin dashboard', 'Inventory management', 'Sales reports'],
        sort_order: 4, is_active: true,
      },
      {
        title_es: 'SEO & Performance',
        title_en: 'SEO & Performance',
        description_es: 'Optimización técnica para que tu sitio aparezca en Google y cargue en menos de 2 segundos. Auditoría completa y mejoras medibles.',
        description_en: 'Technical optimization so your site ranks on Google and loads in under 2 seconds. Full audit and measurable improvements.',
        icon: 'search',
        features_es: ['Auditoría técnica SEO', 'Core Web Vitals', 'Optimización de imágenes', 'Schema markup', 'Velocidad de carga'],
        features_en: ['Technical SEO audit', 'Core Web Vitals', 'Image optimization', 'Schema markup', 'Load speed'],
        sort_order: 5, is_active: true,
      },
      {
        title_es: 'Mantenimiento & Soporte',
        title_en: 'Maintenance & Support',
        description_es: 'Mantenimiento continuo, actualizaciones de seguridad, corrección de bugs y soporte técnico para tus proyectos existentes.',
        description_en: 'Ongoing maintenance, security updates, bug fixes and technical support for your existing projects.',
        icon: 'wrench',
        features_es: ['Actualizaciones de seguridad', 'Corrección de bugs', 'Monitoreo 24/7', 'Backups automáticos', 'Soporte prioritario'],
        features_en: ['Security updates', 'Bug fixes', '24/7 monitoring', 'Automatic backups', 'Priority support'],
        sort_order: 6, is_active: true,
      },
    ]);
    console.log('✓ Services seeded');
  } else {
    console.log('· Services already exist, skipping');
  }

  // ── TESTIMONIALS ────────────────────────────────────────────────────────────
  const testimonialCount = await Testimonial.count();
  if (testimonialCount === 0) {
    await Testimonial.bulkCreate([
      {
        author_name: 'Carlos Mendoza',
        author_position_es: 'CEO', author_position_en: 'CEO',
        author_company: 'TechLatam',
        content_es: 'Ricardo entregó nuestra plataforma web completa en tiempo récord. La calidad del código es excelente y siempre estuvo disponible para resolver dudas. Lo recomiendo sin dudar.',
        content_en: 'Ricardo delivered our entire web platform in record time. The code quality is excellent and he was always available to answer questions. I highly recommend him.',
        rating: 5, sort_order: 1, is_active: true,
      },
      {
        author_name: 'Sarah Johnson',
        author_position_es: 'Product Manager', author_position_en: 'Product Manager',
        author_company: 'StartupNY',
        content_es: 'Trabajar con Ricardo fue una experiencia increíble. Transformó nuestras ideas en una app móvil funcional y bella. Su conocimiento técnico y comunicación son de primer nivel.',
        content_en: 'Working with Ricardo was an amazing experience. He transformed our ideas into a beautiful, functional mobile app. His technical knowledge and communication are top-notch.',
        rating: 5, sort_order: 2, is_active: true,
      },
      {
        author_name: 'Ana Rodríguez',
        author_position_es: 'Fundadora', author_position_en: 'Founder',
        author_company: 'EcomStore',
        content_es: 'Nuestras ventas aumentaron un 40% después de que Ricardo rediseñó y optimizó nuestra tienda online. Entregó más de lo que prometió y siempre fue puntual.',
        content_en: 'Our sales increased 40% after Ricardo redesigned and optimized our online store. He delivered more than he promised and was always on time.',
        rating: 5, sort_order: 3, is_active: true,
      },
      {
        author_name: 'Miguel Torres',
        author_position_es: 'CTO', author_position_en: 'CTO',
        author_company: 'FinTech Solutions',
        content_es: 'Ricardo construyó toda nuestra API backend desde cero. La arquitectura es limpia, segura y escalable. Un profesional excepcional que realmente entiende el negocio.',
        content_en: 'Ricardo built our entire backend API from scratch. The architecture is clean, secure and scalable. An exceptional professional who truly understands the business.',
        rating: 5, sort_order: 4, is_active: true,
      },
    ]);
    console.log('✓ Testimonials seeded');
  } else {
    console.log('· Testimonials already exist, skipping');
  }

  // ── EXPERIENCE (2019 – 2025) ─────────────────────────────────────────────────
  const experienceCount = await Experience.count();
  if (experienceCount === 0) {
    await Experience.bulkCreate([
      {
        company: 'Rich Sof',
        company_url: 'https://www.richsof.com',
        position_es: 'Full Stack Developer & Founder',
        position_en: 'Full Stack Developer & Founder',
        employment_type: 'fulltime',
        description_es: 'Fundé Rich Sof para ofrecer soluciones digitales de alto impacto a startups y empresas en crecimiento. Lideré el desarrollo de múltiples proyectos web y móviles, desde el diseño hasta el despliegue en producción.',
        description_en: 'Founded Rich Sof to deliver high-impact digital solutions to startups and growing businesses. Led development of multiple web and mobile projects from design to production deployment.',
        achievements_es: [
          'Entregué +20 proyectos web y móviles en producción',
          'Reduje tiempos de carga promedio en un 60% usando Next.js y optimización de imágenes',
          'Implementé arquitecturas escalables con Docker y CI/CD',
          'Aumenté las ventas de clientes e-commerce en promedio 35%',
        ],
        achievements_en: [
          'Delivered 20+ web and mobile projects to production',
          'Reduced average load times by 60% using Next.js and image optimization',
          'Implemented scalable architectures with Docker and CI/CD',
          'Increased client e-commerce sales by an average of 35%',
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'React Native', 'PostgreSQL', 'Docker', 'TypeScript'],
        start_date: new Date('2022-01-01'),
        end_date: new Date('2025-12-01'),
        is_current: false,
        location: 'New York, USA · Remote',
        sort_order: 1,
      },
      {
        company: 'Freelance',
        position_es: 'Desarrollador Full Stack Freelance',
        position_en: 'Freelance Full Stack Developer',
        employment_type: 'freelance',
        description_es: 'Desarrollé soluciones web y móviles para clientes en USA, México y Latinoamérica. Especializado en React, Node.js y React Native para startups y pymes.',
        description_en: 'Developed web and mobile solutions for clients in USA, Mexico and Latin America. Specialized in React, Node.js and React Native for startups and SMEs.',
        achievements_es: [
          'Desarrollé +20 aplicaciones para clientes internacionales',
          'Mantuve una calificación de 5 estrellas en plataformas de freelance',
          'Implementé sistemas de pagos con Stripe para clientes e-commerce',
          'Migré proyectos legacy de PHP/jQuery a React + Node.js',
        ],
        achievements_en: [
          'Developed 20+ applications for international clients',
          'Maintained 5-star rating on freelance platforms',
          'Implemented Stripe payment systems for e-commerce clients',
          'Migrated legacy PHP/jQuery projects to React + Node.js',
        ],
        technologies: ['React', 'Vue.js', 'Node.js', 'Express', 'PHP', 'MongoDB', 'MySQL', 'React Native'],
        start_date: new Date('2020-03-01'),
        end_date: new Date('2022-01-01'),
        is_current: false,
        location: 'Remote',
        sort_order: 2,
      },
      {
        company: 'Agencia Digital MX',
        position_es: 'Desarrollador Frontend',
        position_en: 'Frontend Developer',
        employment_type: 'fulltime',
        description_es: 'Desarrollé interfaces de usuario para clientes corporativos usando React y Vue.js. Colaboré en equipo ágil bajo metodología Scrum para proyectos de mediana y gran escala.',
        description_en: 'Developed user interfaces for corporate clients using React and Vue.js. Collaborated in agile team under Scrum methodology for medium and large scale projects.',
        achievements_es: [
          'Migré 3 proyectos legacy de jQuery a React, mejorando performance 50%',
          'Implementé design systems reutilizables con Storybook',
          'Entregué proyectos 100% a tiempo bajo sprints de 2 semanas',
          'Integré APIs REST y GraphQL para +10 clientes corporativos',
        ],
        achievements_en: [
          'Migrated 3 legacy jQuery projects to React, improving performance 50%',
          'Implemented reusable design systems with Storybook',
          'Delivered 100% of projects on time under 2-week sprints',
          'Integrated REST and GraphQL APIs for 10+ corporate clients',
        ],
        technologies: ['React', 'Vue.js', 'JavaScript', 'PHP', 'SASS', 'GraphQL', 'Git'],
        start_date: new Date('2019-01-01'),
        end_date: new Date('2020-03-01'),
        is_current: false,
        location: 'México · Presencial',
        sort_order: 3,
      },
    ]);
    console.log('✓ Experience seeded (2019–2025)');
  } else {
    console.log('· Experience already exist, skipping');
  }

  // ── PROJECTS ────────────────────────────────────────────────────────────────
  const projectCount = await Project.count();
  if (projectCount === 0) {
    await Project.bulkCreate([
      {
        title_es: 'Portafolio Personal',
        title_en: 'Personal Portfolio',
        short_description_es: 'Portafolio profesional bilingüe con CMS propio, animaciones y SEO optimizado.',
        short_description_en: 'Bilingual professional portfolio with custom CMS, animations and optimized SEO.',
        description_es: 'Portafolio full stack con panel de administración propio. Gestión de proyectos, habilidades, experiencia, servicios y testimonios. Frontend en Next.js con Framer Motion, backend en Node.js con PostgreSQL.',
        description_en: 'Full stack portfolio with custom admin panel. Manages projects, skills, experience, services and testimonials. Next.js frontend with Framer Motion, Node.js backend with PostgreSQL.',
        category: 'fullstack', role_es: 'Full Stack Developer', role_en: 'Full Stack Developer',
        duration: '3 semanas / 3 weeks',
        live_url: 'https://portafolio.reyes.richsof.com',
        repo_url: 'https://github.com/Ricardo-RC93/Portafolio-ReyesCasanova',
        featured: true, status: 'published', sort_order: 1,
      },
      {
        title_es: 'App de Delivery',
        title_en: 'Delivery App',
        short_description_es: 'App móvil de delivery con tracking en tiempo real para iOS y Android.',
        short_description_en: 'Mobile delivery app with real-time tracking for iOS and Android.',
        description_es: 'Aplicación móvil completa de delivery con seguimiento en tiempo real, notificaciones push, integración de pagos con Stripe y panel de administración web.',
        description_en: 'Complete mobile delivery app with real-time tracking, push notifications, Stripe payment integration and web admin panel.',
        category: 'mobile', role_es: 'Full Stack Mobile Developer', role_en: 'Full Stack Mobile Developer',
        duration: '6 semanas / 6 weeks',
        featured: true, status: 'published', sort_order: 2,
      },
      {
        title_es: 'Plataforma E-Commerce',
        title_en: 'E-Commerce Platform',
        short_description_es: 'Tienda online completa con pagos, inventario y panel de administración.',
        short_description_en: 'Complete online store with payments, inventory and admin panel.',
        description_es: 'Plataforma e-commerce con catálogo de productos, carrito, checkout con Stripe, gestión de inventario y reportes de ventas.',
        description_en: 'E-commerce platform with product catalog, cart, Stripe checkout, inventory management and sales reports.',
        category: 'fullstack', role_es: 'Full Stack Developer', role_en: 'Full Stack Developer',
        duration: '8 semanas / 8 weeks',
        featured: true, status: 'published', sort_order: 3,
      },
      {
        title_es: 'Dashboard Analytics',
        title_en: 'Analytics Dashboard',
        short_description_es: 'Dashboard interactivo con gráficas en tiempo real y reportes exportables.',
        short_description_en: 'Interactive dashboard with real-time charts and exportable reports.',
        description_es: 'Dashboard empresarial con visualización de datos en tiempo real, gráficas con Recharts, filtros avanzados y exportación a PDF y Excel.',
        description_en: 'Enterprise dashboard with real-time data visualization, Recharts, advanced filters and export to PDF and Excel.',
        category: 'web', role_es: 'Frontend Developer', role_en: 'Frontend Developer',
        duration: '4 semanas / 4 weeks',
        featured: false, status: 'published', sort_order: 4,
      },
      {
        title_es: 'API REST FinTech',
        title_en: 'FinTech REST API',
        short_description_es: 'API segura para plataforma financiera con JWT y encriptación de datos.',
        short_description_en: 'Secure API for financial platform with JWT and data encryption.',
        description_es: 'API REST de alta seguridad con JWT + refresh tokens, encriptación de datos sensibles, rate limiting y documentación Swagger.',
        description_en: 'High-security REST API with JWT + refresh tokens, sensitive data encryption, rate limiting and Swagger documentation.',
        category: 'other', role_es: 'Backend Developer', role_en: 'Backend Developer',
        duration: '5 semanas / 5 weeks',
        featured: false, status: 'published', sort_order: 5,
      },
      {
        title_es: 'App de Fitness',
        title_en: 'Fitness App',
        short_description_es: 'App móvil de fitness con rutinas personalizadas y seguimiento de progreso.',
        short_description_en: 'Fitness mobile app with personalized routines and progress tracking.',
        description_es: 'App de fitness con planes personalizados, seguimiento de progreso, integración con Apple Health y Google Fit, y comunidad de usuarios.',
        description_en: 'Fitness app with personalized plans, progress tracking, Apple Health and Google Fit integration, and user community.',
        category: 'mobile', role_es: 'Mobile Developer', role_en: 'Mobile Developer',
        duration: '7 semanas / 7 weeks',
        featured: false, status: 'published', sort_order: 6,
      },
    ]);
    console.log('✓ Projects seeded');
  } else {
    console.log('· Projects already exist, skipping');
  }

  console.log('\n✅ Portfolio seed complete!');
};

seedPortfolio()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
