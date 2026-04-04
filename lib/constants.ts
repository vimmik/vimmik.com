export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'erp',
    title: 'Enterprise ERP Systems',
    description: 'End-to-end business management platforms that unify operations, finance, and supply chains into a single source of truth.',
    icon: 'erp',
  },
  {
    id: 'saas',
    title: 'SaaS Platforms',
    description: 'Multi-tenant cloud applications built for scale, with role-based access, subscription billing, and zero-downtime deployments.',
    icon: 'saas',
  },
  {
    id: 'mgmt',
    title: 'Management Systems',
    description: 'Modular HR, Inventory, and Finance systems engineered to automate workflows and surface actionable intelligence.',
    icon: 'mgmt',
  },
  {
    id: 'api',
    title: 'API & Integrations',
    description: 'RESTful and GraphQL APIs that connect your business ecosystem — third-party services, legacy systems, and modern microservices.',
    icon: 'api',
  },
  {
    id: 'data',
    title: 'Data Analytics',
    description: 'Real-time dashboards and business intelligence pipelines that transform raw data into competitive advantage.',
    icon: 'data',
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    description: 'Cross-platform iOS and Android enterprise apps with offline capability, biometric auth, and seamless backend sync.',
    icon: 'mobile',
  },
];

export const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 20, suffix: '+', label: 'Enterprise Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
];

export const TECH_STACK: { name: string; icon: string }[] = [
  { name: 'React',      icon: 'https://cdn.simpleicons.org/react/3BA3E8' },
  { name: 'Next.js',    icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: '.NET Core',  icon: 'https://cdn.simpleicons.org/dotnet/512BD4' },
  { name: 'Nest.js',    icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Node.js',    icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python',     icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'SQL Server', icon: 'https://cdn.simpleicons.org/microsoftsqlserver/CC2927' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/336791' },
  { name: 'Supabase',   icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Firebase',   icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Docker',     icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'GitHub',     icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Redis',      icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'GraphQL',    icon: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
];

export const PROJECTS = [
  {
    id: 'agrierp',
    title: 'AgriERP',
    description: 'Enterprise agricultural management platform for large-scale tea and rubber estate operations. Handles field tracking, yield analytics, labour management, and supply chain from harvest to export.',
    tags: ['.NET Core', 'SQL Server', 'Azure', 'TypeScript'],
    accent: '#3BA3E8',
  },
  {
    id: 'pharmacare',
    title: 'PharmaCare',
    description: 'Multi-tenant SaaS platform for pharmacy chains — drug inventory management, prescription tracking, supplier integrations, and regulatory compliance reporting.',
    tags: ['React', '.NET Core', 'PostgreSQL', 'Docker'],
    accent: '#4ECDC4',
  },
  {
    id: 'retailpos',
    title: 'RetailPOS',
    description: 'Unified point-of-sale and retail management system for multi-branch operations. Real-time stock sync, branch analytics, loyalty programs, and offline transaction support.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    accent: '#A855F7',
  },
];

export const CONTACT_PROJECT_TYPES = [
  'Enterprise ERP / Management System',
  'SaaS Platform',
  'API Development & Integration',
  'Data Analytics & Dashboards',
  'Mobile Application',
  'Other / Consultation',
];

export const CONTACT_INFO = [
  { label: 'Email', value: 'hello@vimmik.com', icon: 'email' },
  { label: 'Phone', value: '+94 77 123 4567', icon: 'phone' },
  { label: 'Location', value: 'Colombo, Sri Lanka', icon: 'location' },
];
