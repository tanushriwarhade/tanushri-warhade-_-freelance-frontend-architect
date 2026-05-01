export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  category: 'AI' | 'SaaS' | 'Dashboard';
  results: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'UI/UX' | 'Tools';
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'voxchain-voting',
    title: 'VoxChain Voting System',
    description: 'A blockchain-based secure voting platform ensuring transparency and immutability in organizational elections.',
    problem: 'Traditional electronic voting systems are prone to tampering and lack public verifiability.',
    solution: 'Built a decentralized voting app using React and blockchain concepts to record votes as immutable transactions.',
    techStack: ['React', 'Solidity', 'Web3.js', 'Tailwind CSS'],
    liveUrl: 'https://voxchain-voting.vercel.app/',
    githubUrl: 'https://github.com/tanushriwarhade/voxchain-voting',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop',
    category: 'SaaS',
    results: [
      'End-to-end encryption for voter privacy',
      'Immutable audit trail of all votes',
      'Real-time result visualization dashboard'
    ]
  },
  {
    id: 'pin-paper-tech',
    title: 'Pin & Paper Tech',
    description: 'Corporate website for a tech solutions agency, showcasing services and portfolio projects.',
    problem: 'The agency needed a modern, high-performance web presence to attract international clients.',
    solution: 'Designed and developed a premium-grade corporate site with optimized assets and smooth animations.',
    techStack: ['React', 'Framer Motion', 'Tailwind', 'Next.js'],
    liveUrl: 'https://pinandpaper.tech/',
    githubUrl: 'https://github.com/tanushriwarhade',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
    category: 'SaaS',
    results: [
      'Lighthouse performance score of 99',
      'Integrated CMS for easy project updates',
      'Mobile-first responsive design'
    ]
  },
  {
    id: 'ai-ecommerce',
    title: 'AI Smart E-commerce',
    description: 'An intelligent e-commerce platform with automated product tagging and AI-driven customer sentiment analysis.',
    problem: 'Sellers struggle to categorize large inventories and understand customer feedback at scale.',
    solution: 'Integrated computer vision for auto-tagging and NLP for deep review sentiment analysis to boost sales.',
    techStack: ['React', 'Node.js', 'Python', 'OpenAI', 'TensorFlow.js'],
    liveUrl: 'https://github.com/tanushriwarhade',
    githubUrl: 'https://github.com/tanushriwarhade',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    category: 'AI',
    results: [
      '25% increase in search relevancy',
      'Automated 90% of product categorization',
      'Real-time customer trend forecasting'
    ]
  },
  {
    id: 'price-tracker',
    title: 'Price Tracker Dashboard',
    description: 'E-commerce monitor that tracks product prices across major platforms and visualizes historical trends.',
    problem: 'Consumers often miss flash sales or price drops because they cannot monitor dozens of pages manually.',
    solution: 'Built a web-scraping engine that periodically checks prices and alerts users via a visual dashboard.',
    techStack: ['Python', 'BeautifulSoup', 'Pandas', 'Streamlit'],
    liveUrl: 'https://github.com/tanushriwarhade/E-commerce-Price-tracker-dashboard',
    githubUrl: 'https://github.com/tanushriwarhade/E-commerce-Price-tracker-dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop',
    category: 'Dashboard',
    results: [
      'Successful multi-platform scraping',
      'Real-time data visualization',
      'Automated email alerts for price drops'
    ]
  },
  {
    id: 'django-portfolio',
    title: 'Full-Stack Django Portfolio',
    description: 'A robust personal portfolio with a dedicated Django backend for content management and contact handling.',
    problem: 'Static portfolios lack easy data management and secure form handling.',
    solution: 'Implemented a full-stack architecture with a custom admin panel and secure database integration.',
    techStack: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://github.com/tanushriwarhade/Full-Stack-Portfolio',
    githubUrl: 'https://github.com/tanushriwarhade/Full-Stack-Portfolio',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop',
    category: 'SaaS',
    results: [
      'Secure SQLite database integration',
      'Dynamic project loading from backend',
      'SEO optimized meta tags'
    ]
  },
  {
    id: 'dreamy-notes',
    title: 'My Dreamy Notes',
    description: 'A comprehensive productivity suite featuring a diary, to-do list, and drawing pad.',
    problem: 'Users need a unified space for different types of personal data (text, tasks, sketches) without complex switching.',
    solution: 'Designed a lightweight, fast-loading web app with local storage persistence and a creative dark-mode UI.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://github.com/tanushriwarhade/My-Dreamy-Notes-',
    githubUrl: 'https://github.com/tanushriwarhade/My-Dreamy-Notes-',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop',
    category: 'SaaS',
    results: [
      'Implemented canvas API for drawing',
      'Zero-dependency vanilla JS architecture',
      'Mobile-first responsive layout'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Frontend' },
  { name: 'Express.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'HTML5/CSS3', category: 'Frontend' },
  { name: 'Django', category: 'Frontend' },
  { name: 'Python', category: 'UI/UX' },
  { name: 'REST APIs', category: 'UI/UX' },
  { name: 'MySQL', category: 'UI/UX' },
  { name: 'MongoDB', category: 'UI/UX' },
  { name: 'Anaconda', category: 'UI/UX' },
  { name: 'Jupyter Notebook', category: 'UI/UX' },
  { name: 'Git / GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'Streamlit', category: 'Tools' },
  { name: 'Vercel / Netlify', category: 'Tools' },
];

export const TESTIMONIALS: Testimonial[] = [];

export const SERVICES = [
  {
    title: 'Landing Page Development',
    description: 'High-converting, mobile-first landing pages built with speed and SEO in mind.',
    icon: 'Layout'
  },
  {
    title: 'React Web Applications',
    description: 'Scalable, state-managed applications using the latest React patterns and hooks.',
    icon: 'Code2'
  },
  {
    title: 'UI/UX Implementation',
    description: 'Pixel-perfect translation of complex Figma or Adobe XD designs into clean code.',
    icon: 'Palette'
  },
  {
    title: 'Performance Optimization',
    description: 'Auditing and fixing slow load times, poor accessibility, and SEO bottlenecks.',
    icon: 'Zap'
  }
];

export const RESUME_URL = "https://drive.google.com/file/d/1noKeq6xUzzVAEuweF1htpdyeTwRduHC_/view?usp=drive_link";
