import heroWorkstationImg from '../assets/images/hero_workstation_1795328647830.jpg';
import anchormanImg from '../assets/images/project_anchorman_1795328647135.jpg';
import mlGraphImg from '../assets/images/project_ml_graph_1795328646819.jpg';
import scoutxImg from '../assets/images/project_scoutx_1795328647154.jpg';
import dualKprImg from '../assets/images/project_dualkpr_1795328648035.jpg';
import neurokoImg from '../assets/images/project_neuroko_1795328647095.jpg';
import creativePosterImg from '../assets/images/creative_poster_design_1795328647521.jpg';
import creativeBrandingImg from '../assets/images/creative_event_branding_1795328648235.jpg';
import creativePhotoImg from '../assets/images/creative_night_photo_1795328646576.jpg';

export type ModuleId =
  | 'profile'
  | 'projects'
  | 'security'
  | 'creative'
  | 'leadership'
  | 'data'
  | 'terminal'
  | 'contact';

export type ProjectCategory =
  | 'All'
  | 'Development'
  | 'Machine Learning'
  | 'Concepts'
  | 'Creative';

export type ProjectStatusTag =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CONCEPT'
  | 'LEARNING'
  | 'EXPLORATION';

export interface ModuleMeta {
  id: ModuleId;
  title: string;
  shortLabel: string;
  route: string;
  index: string;
  summary: string;
  accent: 'green' | 'cyan' | 'violet';
  fileName: string;
}

export interface ProjectItem {
  id: string;
  fileName: string;
  title: string;
  categories: Exclude<ProjectCategory, 'All'>[];
  primaryCategory: Exclude<ProjectCategory, 'All'>;
  status: string;
  statusTag: ProjectStatusTag;
  summary: string;
  overview: string;
  problem: string;
  approach: string;
  details: string[];
  technologies: string[];
  futureDirection?: string;
  achievement?: string;
  scaleNote?: string;
  image?: string;
  imageAlt: string;
  isArchitecturalFallback?: boolean;
  accentColor: 'green' | 'cyan' | 'violet';
  githubUrl?: string;
  githubLabel: string;
  isConcept: boolean;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: 'Graphic & Poster' | 'Event Branding' | 'Photography';
  caption: string;
  medium: string;
  aspect: 'portrait' | 'landscape';
  image: string;
  imageAlt: string;
  placeholderNotice: string;
}

export interface SocialProfile {
  id: string;
  platform: string;
  handle: string;
  url: string;
  category: 'Primary' | 'Engineering' | 'Security' | 'Pending';
  isPlaceholder?: boolean;
}

export const HERO_IMAGE = heroWorkstationImg;

export const PERSONAL_INFO = {
  fullName: 'Mohammed Ayub A',
  brand: 'AYUB // TRIPLE 4',
  heroBrand: 'MOHAMMED AYUB // TRIPLE 4',
  tagline: 'BUILD. BREAK. CREATE.',
  roles: [
    'Software Developer',
    'Cybersecurity Enthusiast',
    'Creative Designer',
  ],
  intro:
    'I build digital experiences, explore the security behind systems, and experiment with ideas that connect technology and creativity.',
  institution: 'KPR Institute of Engineering and Technology, Coimbatore',
  degree: 'B.Tech Information Technology',
  cgpa: '8.53',

  email: 'ayub.md0021@gmail.com',
  philosophy:
    'Build things, understand systems, challenge assumptions, and keep experimenting.',
  resumePdfRelativePath: 'assets/aistudio/Mohammed_Ayub_A_Resume_548b9d09.pdf',
  resumeFileName: 'Mohammed_Ayub_A_Resume.pdf',
  resumeNote:
    'Official resume PDF attached directly to the portfolio workspace.',
};

export const DESKTOP_APP_IDS: ModuleId[] = [
  'profile',
  'projects',
  'security',
  'creative',
  'data',
  'leadership',
];

export const MODULES: ModuleMeta[] = [
  {
    id: 'profile',
    title: 'Profile',
    shortLabel: 'Profile',
    route: '/profile',
    index: '01',
    summary: 'Identity, education, interests & skills inventory',
    accent: 'green',
    fileName: 'profile.sys',
  },
  {
    id: 'projects',
    title: 'Projects',
    shortLabel: 'Projects',
    route: '/projects',
    index: '02',
    summary: 'Project explorer & detailed engineering records',
    accent: 'cyan',
    fileName: 'projects.dir',
  },
  {
    id: 'security',
    title: 'Security',
    shortLabel: 'Security',
    route: '/security',
    index: '03',
    summary: 'Cybersecurity labs, Arch Linux & governance study',
    accent: 'green',
    fileName: 'security.lab',
  },
  {
    id: 'creative',
    title: 'Creative',
    shortLabel: 'Creative',
    route: '/creative',
    index: '04',
    summary: 'Graphic design, LaunchPad branding & photography',
    accent: 'cyan',
    fileName: 'creative.studio',
  },
  {
    id: 'data',
    title: 'Data Lab',
    shortLabel: 'Data Lab',
    route: '/data',
    index: '05',
    summary: 'Data analysis, entity indexing & sports analytics',
    accent: 'green',
    fileName: 'data.lab',
  },
  {
    id: 'leadership',
    title: 'Leadership',
    shortLabel: 'Leadership',
    route: '/leadership',
    index: '06',
    summary: 'Campus responsibilities, events & achievements',
    accent: 'violet',
    fileName: 'leadership.log',
  },
  {
    id: 'terminal',
    title: 'Terminal',
    shortLabel: 'Terminal',
    route: '/terminal',
    index: '07',
    summary: 'Interactive shell for command navigation',
    accent: 'cyan',
    fileName: 'triple4.sh',
  },
  {
    id: 'contact',
    title: 'Contact',
    shortLabel: 'Contact',
    route: '/contact',
    index: '08',
    summary: 'Direct email, resume & verified profiles',
    accent: 'green',
    fileName: 'contact.card',
  },
];

export const ABOUT_INTERESTS = [
  {
    title: 'Software Engineering',
    description:
      'Designing structured applications, database-backed mobile tools, and maintainable web architectures.',
  },
  {
    title: 'Cybersecurity',
    description:
      'Hands-on lab practice, security monitoring fundamentals, threat analysis, and system governance.',
  },
  {
    title: 'Machine Learning',
    description:
      'Exploring data indexing, candidate retrieval, record linkage, and applied analytical workflows.',
  },
  {
    title: 'Linux & Open Source',
    description:
      'Configuring Arch Linux, bootloaders, kernel drivers, and keyboard-first desktop environments.',
  },
  {
    title: 'UI/UX & Graphic Design',
    description:
      'Crafting deliberate visual identities, event branding systems, editorial layouts, and typography.',
  },
  {
    title: 'Photography & Visual Storytelling',
    description:
      'Composing high-contrast observational frames, light studies, and documentary narratives.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'anchorman',
    fileName: 'anchorman.apk',
    title: 'Anchorman',
    categories: ['Development', 'Creative'],
    primaryCategory: 'Development',
    status: 'Active development',
    statusTag: 'ACTIVE',
    summary:
      'Personal Android reminder and memory application for organizing reminders, activities, ideas, and events.',
    overview:
      'Anchorman is a native Android personal memory and reminder application built to capture daily tasks, spontaneous ideas, activities, and events in one cohesive workspace.',
    problem:
      'Generic reminder lists often feel sterile and scatter personal thoughts, event cues, and active reminders across disconnected apps.',
    approach:
      'Engineered with Kotlin and Room local persistence, paired with a bold comic-inspired cyan, red, and yellow visual identity designed for high-contrast glanceability.',
    details: [
      'Native Android application engineered with Kotlin and Room database.',
      'Custom cyan, red, and yellow comic-inspired visual identity.',
      'Organizes reminders, activities, ideas, and upcoming events locally.',
    ],
    technologies: ['Android', 'Kotlin', 'Room Database'],
    futureDirection:
      'Planned account system and cross-device PC synchronization.',
    image: anchormanImg,
    imageAlt:
      'Concept showcase of the Anchorman Android reminder app featuring cyan, red, and yellow comic-inspired modular cards',
    accentColor: 'cyan',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Repository placeholder (github.com/ayub0021)',
    isConcept: false,
  },
  {
    id: 'hostel-room-booking',
    fileName: 'hostel-room-booking.web',
    title: 'Hostel Room Booking Website',
    categories: ['Development'],
    primaryCategory: 'Development',
    status: 'Completed',
    statusTag: 'COMPLETED',
    achievement: 'Best First-Year Project',
    summary:
      'Academic web project focused on hostel room booking, recognized as the Best First-Year Project.',
    overview:
      'An academic web application created during the first year of study to handle hostel room booking workflows clearly and practically.',
    problem:
      'Manual room selection and allocation workflows create friction for incoming hostel residents and administrators.',
    approach:
      'Focused on clean structure and practical academic execution, earning the Best First-Year Project distinction.',
    details: [
      'Completed first-year academic web project focused on hostel room booking.',
      'Recognized with the Best First-Year Project award.',
    ],
    technologies: [],
    isArchitecturalFallback: true,
    imageAlt:
      'Minimalist architectural blueprint grid representing the Hostel Room Booking academic web project',
    accentColor: 'green',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Repository placeholder (github.com/ayub0021)',
    isConcept: false,
  },
  {
    id: 'amazon-ml-entity-matching',
    fileName: 'entity-matching-2026.py',
    title: 'Amazon ML Challenge 2026 — Entity Matching',
    categories: ['Machine Learning', 'Development'],
    primaryCategory: 'Machine Learning',
    status: 'Competition project',
    statusTag: 'COMPLETED',
    summary:
      'Large-scale entity matching and record linkage challenge focused on indexing and candidate matching optimization.',
    overview:
      'Competition engineering effort tackling large-scale entity matching and record linkage across messy, high-volume product/entity records.',
    problem:
      'Comparing candidate pairs naively across a dataset scale spanning millions of records is computationally prohibitive.',
    approach:
      'Implemented structured indexing and fast candidate retrieval using Python, SQLite, and FTS5 full-text indexing to narrow candidate sets and optimize matching speed.',
    details: [
      'Built dataset indexing pipelines using Python, SQLite, and FTS5.',
      'Focused on candidate matching quality and query optimization.',
      'Designed around a competition dataset scale of millions of records.',
    ],
    technologies: ['Python', 'SQLite', 'FTS5'],
    scaleNote: 'Challenge dataset scale: millions of records',
    futureDirection:
      'Continuing exploration of hybrid lexical + semantic ranking pipelines for record linkage.',
    image: mlGraphImg,
    imageAlt:
      'Isometric data linkage graph depicting sparse matrix indexing and candidate matching pathways',
    accentColor: 'green',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Repository placeholder (github.com/ayub0021)',
    isConcept: false,
  },
  {
    id: 'scoutx',
    fileName: 'scoutx.concept',
    title: 'ScoutX',
    categories: ['Concepts', 'Creative'],
    primaryCategory: 'Concepts',
    status: 'Concept',
    statusTag: 'CONCEPT',
    summary:
      'Athlete-focused professional networking platform concept inspired by LinkedIn and football ecosystems.',
    overview:
      'ScoutX explores what a dedicated professional graph looks like when designed specifically for athletes, scouts, clubs, and football ecosystems.',
    problem:
      'Traditional professional networks lack sports-specific profile structures, tactical context, and athlete discovery workflows.',
    approach:
      'Designed around structured athlete profiles, sports-oriented networking, and a sharp electric cyan visual direction inspired by modern football analytics.',
    details: [
      'Athlete-focused profile architecture and career visibility.',
      'Sports-oriented networking inspired by LinkedIn and football ecosystems.',
      'Cohesive dark-mode electric cyan brand identity.',
    ],
    technologies: ['Product Concept', 'Sports UI Direction'],
    futureDirection:
      'Prototyping interactive athlete profile cards and scouting discovery flows.',
    image: scoutxImg,
    imageAlt:
      'Dark-mode tactical pitch geometry and cyan athlete profile network concept for ScoutX',
    accentColor: 'cyan',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Concept documentation placeholder',
    isConcept: true,
  },
  {
    id: 'dual-kpr',
    fileName: 'dual-kpr-twin.3d',
    title: 'Dual KPR — Digital Twin',
    categories: ['Concepts'],
    primaryCategory: 'Concepts',
    status: 'Concept / exploration',
    statusTag: 'EXPLORATION',
    summary:
      'Digital twin concept for a college environment, anchored by an initial 3D stadium practice build.',
    overview:
      'An exploratory campus digital twin initiative investigating how spatial 3D geometry can represent a college environment interactively.',
    problem:
      'Campus spaces and event venues are rarely navigable as unified, inspectable spatial models.',
    approach:
      'Began with an initial 3D stadium practice build to study spatial scale, structural geometry, and digital twin visualization patterns.',
    details: [
      'Digital twin concept for a college campus environment.',
      'Includes an initial 3D stadium practice build.',
    ],
    technologies: ['3D Practice Build', 'Spatial Exploration'],
    futureDirection:
      'Expanding spatial blocks incrementally from the stadium study toward broader campus landmarks.',
    image: dualKprImg,
    imageAlt:
      '3D wireframe architectural stadium and topographic campus grid representing Dual KPR Digital Twin exploration',
    accentColor: 'green',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Exploration repository placeholder',
    isConcept: true,
  },
  {
    id: 'neuroko-os',
    fileName: 'neuroko-os.env',
    title: 'Neuroko Personal OS',
    categories: ['Concepts', 'Creative'],
    primaryCategory: 'Creative',
    status: 'Concept / experimentation',
    statusTag: 'EXPLORATION',
    summary:
      'Personal computing environment and digital workspace concept inspired by Linux customization and terminal ergonomics.',
    overview:
      'Neuroko Personal OS is a workspace design experiment reimagining a focused personal computing environment with minimal chrome and keyboard-driven clarity.',
    problem:
      'Modern desktop environments often distract with noisy notifications and inconsistent visual systems.',
    approach:
      'Synthesizes dark green and electric cyan visual discipline, productivity-oriented tiling layouts, and terminal-inspired ergonomics shaped by Linux customization.',
    details: [
      'Dark green and cyan visual identity.',
      'Productivity and terminal-inspired workspace layout.',
      'Inspired by Arch Linux desktop customization and tiling workflows.',
    ],
    technologies: ['Workspace Concept', 'Linux Inspiration'],
    futureDirection:
      'Iterating on modular window states and keyboard-first workspace ergonomics.',
    image: neurokoImg,
    imageAlt:
      'Dark green and cyan tiling workspace layout concept on a studio monitor for Neuroko Personal OS',
    accentColor: 'violet',
    githubUrl: 'https://github.com/ayub0021',
    githubLabel: 'Experimentation notes placeholder',
    isConcept: true,
  },
];

export const DATA_LAB = {
  featuredProjectId: 'amazon-ml-entity-matching',
  title: 'Data Analysis, Indexing & Sports Exploration',
  subtitle:
    'Honest exploration across structured datasets, large-scale record linkage, and football-inspired analytics concepts.',
  highlights: [
    {
      label: 'Data Analysis & Foundations',
      value: 'Python · NumPy · Pandas',
      detail:
        'Practicing tabular data cleaning, exploratory analysis, and foundational machine learning workflows.',
    },
    {
      label: 'Competition Indexing',
      value: 'Amazon ML Challenge 2026',
      detail:
        'Built SQLite + FTS5 indexing and candidate matching experiments designed for a challenge dataset scale of millions of records.',
    },
    {
      label: 'Sports Analytics Interest',
      value: 'Football & Athlete Ecosystems',
      detail:
        'Exploring how match metrics, player profiles, and structured scouting data connect — shaping early concepts like ScoutX.',
    },
  ],
  workflowSteps: [
    {
      step: '01',
      name: 'Exploratory Data Preparation',
      description:
        'Normalizing text fields, inspecting distributions, and structuring tabular records with Python and Pandas.',
    },
    {
      step: '02',
      name: 'SQLite FTS5 Candidate Indexing',
      description:
        'Using full-text search indexing to narrow candidate sets efficiently before scoring potential entity matches.',
    },
    {
      step: '03',
      name: 'Sports & Concept Exploration',
      description:
        'Studying athlete metrics and football ecosystem data patterns strictly as ongoing learning and product concepts.',
    },
  ],
};

export const CYBERSECURITY_LAB = {
  platforms: [
    {
      name: 'TryHackMe',
      status: 'LEARNING · ACTIVE PROFILE',
      handle: '@triple4verse',
      url: 'https://tryhackme.com/p/triple4verse',
      description:
        'Hands-on guided rooms covering Linux fundamentals, networking, web security basics, and defensive concepts.',
      isPlaceholder: false,
    },
    {
      name: 'Hack The Box',
      status: 'EDITABLE PLACEHOLDER',
      handle: 'Profile URL pending',
      url: '',
      description:
        'Reserved slot for Hack The Box profile link once published.',
      isPlaceholder: true,
    },
  ],
  socFocus: [
    'Security monitoring fundamentals',
    'Threat analysis & log reasoning',
    'Security operations workflows',
    'Incident response learning',
  ],
  archExploration: [
    'Arch Linux installation & base system configuration',
    'systemd-boot setup and bootloader troubleshooting',
    'NVIDIA driver configuration & display troubleshooting',
    'Linux desktop customization and window ergonomics',
    'Command-line diagnostics and system recovery',
  ],
  lawAndGovernance: {
    title: 'Cybersecurity + Law + Governance',
    description:
      'Exploring the intersection of cybersecurity, emerging technology, legal frameworks, and institutional governance — including internship-related learning in policy, compliance, and risk perspectives.',
  },
};

export const CREATIVE_ITEMS: CreativeItem[] = [
  {
    id: 'poster-grid-study',
    title: 'Swiss Brutalist Grid Study',
    category: 'Graphic & Poster',
    caption:
      'Editorial typography and asymmetric grid exploration on heavy charcoal stock.',
    medium: 'Poster Design Study · 3:4 Portrait',
    aspect: 'portrait',
    image: creativePosterImg,
    imageAlt:
      'Placeholder graphic design poster study featuring emerald green geometric shapes on charcoal paper',
    placeholderNotice: 'Placeholder study — replace with original poster design work',
  },
  {
    id: 'launchpad-branding-study',
    title: 'LaunchPad Event Identity Concept',
    category: 'Event Branding',
    caption:
      'Visual identity direction for campus innovation and entrepreneurship initiatives.',
    medium: 'Event Collateral Study · 4:3 Landscape',
    aspect: 'landscape',
    image: creativeBrandingImg,
    imageAlt:
      'Placeholder event branding flat-lay showing geometric black badge, lanyard, and printed programme card',
    placeholderNotice:
      'Placeholder study — replace with actual LaunchPad / Ignitrron branding assets',
  },
  {
    id: 'monochrome-rain-study',
    title: 'Urban Concrete & Cyan Reflections',
    category: 'Photography',
    caption:
      'High-contrast night street light study focusing on wet surface reflections and architectural geometry.',
    medium: 'Photography Study · 3:4 Portrait',
    aspect: 'portrait',
    image: creativePhotoImg,
    imageAlt:
      'Placeholder night street photography study with brutalist concrete and wet pavement reflections',
    placeholderNotice: 'Placeholder study — replace with original photography',
  },
];

export const LEADERSHIP_ITEMS = [
  {
    index: '01',
    role: 'Secretary, College Design Club',
    category: 'Design Leadership',
    metric: 'Club Governance',
    description:
      'Leading creative initiatives, design reviews, and visual identity execution across campus design activities.',
  },
  {
    index: '02',
    role: 'Secretary, IETE Society of KPRIET',
    category: 'Technical Society',
    metric: 'Department Chapter',
    description:
      'Coordinating technical sessions, student chapter operations, and peer engineering engagement.',
  },
  {
    index: '03',
    role: 'LaunchPad / Ignitrron 26 Participation Growth',
    category: 'Event Impact',
    metric: '3 → 11 Teams',
    description:
      'Drove event participation growth from 3 teams in the previous edition to 11 teams in the latest edition.',
  },
  {
    index: '04',
    role: 'Best First-Year Project Award',
    category: 'Academic Recognition',
    metric: 'Year 1 Distinction',
    description:
      'Awarded Best First-Year Project for the Hostel Room Booking Website academic build.',
  },
  {
    index: '05',
    role: 'High Package Focused Placement Batch',
    category: 'Selective Cohort',
    metric: 'Selected / ~150 Students',
    description:
      'Selected into the High Package Focused Placement Batch from a cohort of approximately 150 department students.',
  },
  {
    index: '06',
    role: 'Brand Ambassador — College Calendar Initiative',
    category: 'Campus Representation',
    metric: 'Official Initiative',
    description:
      'Represented the college calendar initiative through student outreach and visual branding.',
  },
];

export const SKILL_CATEGORIES = [
  {
    category: 'Programming',
    items: ['Python', 'C', 'Java', 'JavaScript'],
  },
  {
    category: 'Development',
    items: ['HTML', 'CSS', 'React', 'Node.js', 'Express.js'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'SQLite', 'MongoDB', 'Firebase', 'Supabase'],
  },
  {
    category: 'Cybersecurity',
    items: [
      'Linux',
      'Networking fundamentals',
      'TryHackMe',
      'Web security learning',
      'Threat analysis fundamentals',
    ],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Postman'],
  },
  {
    category: 'Android',
    items: ['Kotlin', 'Room'],
  },
  {
    category: 'Data / ML',
    items: ['NumPy', 'Pandas', 'Machine Learning fundamentals'],
  },
  {
    category: 'Creative',
    items: [
      'Canva',
      'Adobe Illustrator',
      'UI/UX',
      'Graphic Design',
      'Photography',
      'Video Editing',
    ],
  },
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'mohammed-ayub-a',
    url: 'https://www.linkedin.com/in/mohammed-ayub-a-722680309/',
    category: 'Primary',
  },
  {
    id: 'github',
    platform: 'GitHub',
    handle: 'ayub0021',
    url: 'https://github.com/ayub0021',
    category: 'Engineering',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@ft.triple4',
    url: 'https://instagram.com/ft.triple4',
    category: 'Primary',
  },
  {
    id: 'leetcode',
    platform: 'LeetCode',
    handle: 'triple4',
    url: 'https://leetcode.com/u/triple4/',
    category: 'Engineering',
  },
  {
    id: 'hackerrank',
    platform: 'HackerRank',
    handle: 'ayub_md0021',
    url: 'https://www.hackerrank.com/profile/ayub_md0021',
    category: 'Engineering',
  },
  {
    id: 'tryhackme',
    platform: 'TryHackMe',
    handle: 'triple4verse',
    url: 'https://tryhackme.com/p/triple4verse',
    category: 'Security',
  },
  {
    id: 'hackthebox',
    platform: 'Hack The Box',
    handle: 'ayub0021',
    url: 'https://profile.hackthebox.com/profile/019fdd16-e613-7356-8b69-1c6bc0b74543?utm_medium=copy_url',
    category: 'Security',
  },
  {
    id: 'portswigger',
    platform: 'PortSwigger',
    handle: 'mohammed ayub',
    url: 'https://portswigger.net/users/youraccount/personaldetails',
    category: 'Security',
  },
];
