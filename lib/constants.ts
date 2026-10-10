export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#projects' },
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
    description: 'Multi-tenant cloud applications with isolated tenant data, role-based access and payment integrations.',
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
    description: 'RESTful and GraphQL APIs that connect your business ecosystem, from third-party services to legacy systems and modern microservices.',
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
    description: 'Cross-platform iOS and Android apps built with React Native, sharing types and APIs with your web platform.',
    icon: 'mobile',
  },
];

/* Verifiable from github.com/vimmik; update as the portfolio grows */
export const STATS = [
  { value: 2, suffix: '', label: 'Live Products' },
  { value: 6, suffix: '', label: 'Apps & Services Shipped' },
  { value: 2, suffix: '', label: 'Public Repositories' },
  { value: 100, suffix: '%', label: 'Built in Sri Lanka' },
];

/* What MediChainLK and Kotasa are actually built with */
export const TECH_STACK: { name: string; icon: string }[] = [
  { name: 'TypeScript',     icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React',          icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js',        icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'React Native',   icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Nest.js',        icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
  { name: 'Node.js',        icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python',         icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'FastAPI',        icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'PostgreSQL',     icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Prisma',         icon: 'https://cdn.simpleicons.org/prisma/ffffff' },
  { name: 'Supabase',       icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Firebase',       icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Redis',          icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'Docker',         icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Terraform',      icon: 'https://cdn.simpleicons.org/terraform/844FBA' },
  { name: 'Tailwind CSS',   icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF' },
  { name: 'Vercel',         icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
];

export type Project = {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  accent: string;
  links: { label: string; href: string }[];
};

/* Sourced from the public repositories at github.com/vimmik */
export const PROJECTS: Project[] = [
  {
    id: 'medichainlk',
    title: 'MediChainLK',
    label: 'MEDICHAINLK // HEALTHTECH SAAS',
    description: 'AI-powered, multi-tenant pharmacy platform for Sri Lanka. Prescription OCR and medicine matching, inventory and billing, PayHere payments, and delivery through PickMe Flash and Grasshoppers. It ships as admin and pharmacy portals plus a customer mobile app.',
    tags: ['NestJS', 'Next.js', 'React Native', 'FastAPI', 'PostgreSQL', 'AWS'],
    accent: '#4ECDC4',
    links: [
      { label: 'Live Demo', href: 'https://medi-chainlk-demo.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/vimmik/mediChainlk' },
    ],
  },
  {
    id: 'kotasa',
    title: 'Kotasa',
    label: 'KOTASA // SHARED EXPENSES',
    description: 'Share it. Settle it. Shared expenses for offices, friends, trips and families. Exact splits, netted balances, optional meal ordering and budgets, and a weekly SMS bill for every member, even those without the app.',
    tags: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    accent: '#0094EE',
    links: [
      { label: 'Live App', href: 'https://kotasa.kavishkadinajara.com' },
      { label: 'GitHub', href: 'https://github.com/vimmik/kotasa' },
    ],
  },
];

export const GITHUB_ORG_URL = 'https://github.com/vimmik';

export const CONTACT_PROJECT_TYPES = [
  'Enterprise ERP / Management System',
  'SaaS Platform',
  'API Development & Integration',
  'Data Analytics & Dashboards',
  'Mobile Application',
  'Other / Consultation',
];

export const CONTACT_INFO = [
  { label: 'Email', value: 'info@vimmik.com', href: 'mailto:info@vimmik.com', icon: 'email' },
  { label: 'Phone', value: '+94 78 905 0755', href: 'tel:+94789050755', icon: 'phone' },
  { label: 'Location', value: 'Colombo, Sri Lanka', href: null, icon: 'location' },
];

export const CONTACT_EMAIL = 'info@vimmik.com';

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vimmik/about/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/vimmik_sl', icon: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/vimmik', icon: 'github' },
] as const;
