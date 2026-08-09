/**
 * PORTFOLIO CONTENT MODEL
 * ------------------------
 * Single source of truth for all portfolio content.
 * Sourced strictly from the resume of Rupak Acharya.
 *
 * No fabricated employers, dates, qualifications, metrics, projects,
 * clients, testimonials, awards, or technologies.
 *
 * Where information is missing or ambiguous, it is either omitted
 * or marked with the TODO marker in the README content TODO list.
 */

export interface NavLink {
  label: string;
  href: string;
  index: string; // telemetry-style index, e.g. "01"
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  kind: "email" | "phone" | "location" | "portfolio" | "github" | "linkedin";
}

export interface StatItem {
  value: string;
  label: string;
  note?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  startLabel: string;
  endLabel: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  stack: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  index: string;
  description: string;
  items: string[];
}

export interface OpenSourceContribution {
  id: string;
  project: string;
  description: string;
  url: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  date: string;
  note: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export const profile = {
  name: "Rupak Acharya",
  firstName: "Rupak",
  lastName: "Acharya",
  initials: "RA",
  role: "Senior Full-Stack & Web3 Developer",
  roleShort: "Full-Stack Engineer",
  tagline: "Building resilient web platforms across React, Next.js, Node.js, and the blockchain.",
  introduction:
    "Full-Stack Web Developer with 4+ years building React, Next.js, and Node.js platforms. Working across Web3, smart contracts, and machine learning to ship products that are fast, secure, and maintainable.",
  location: "Kathmandu, Nepal",
  coordinates: "27.7172° N, 85.3240° E",
  timezone: "Asia/Kathmandu (UTC+05:45)",
  email: "acharyarupak391@gmail.com",
  phone: "+977 9863630147",
  availability: "Open to senior full-stack & Web3 engineering roles",
  yearsExperience: "4+",
  portfolioUrl: "https://rupakacharya.com.np",
  githubUrl: "https://github.com/acharyarupak391",
  linkedinUrl: "https://linkedin.com/in/acharyarupak391",
} as const;

export const navLinks: NavLink[] = [
  { label: "Overview", href: "#overview", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Stack", href: "#stack", index: "03" },
  { label: "Open Source", href: "#open-source", index: "04" },
  { label: "Education", href: "#education", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "acharyarupak391@gmail.com",
    href: "mailto:acharyarupak391@gmail.com",
    kind: "email",
  },
  {
    label: "Phone",
    value: "+977 9863630147",
    href: "tel:+9779863630147",
    kind: "phone",
  },
  {
    label: "Location",
    value: "Kathmandu, Nepal",
    href: "https://www.google.com/maps/place/Kathmandu",
    kind: "location",
  },
  {
    label: "Portfolio",
    value: "rupakacharya.com.np",
    href: "https://rupakacharya.com.np",
    kind: "portfolio",
  },
  {
    label: "GitHub",
    value: "github.com/acharyarupak391",
    href: "https://github.com/acharyarupak391",
    kind: "github",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/acharyarupak391",
    href: "https://linkedin.com/in/acharyarupak391",
    kind: "linkedin",
  },
];

export const stats: StatItem[] = [
  {
    value: "4+",
    label: "Years building",
    note: "production web platforms",
  },
  {
    value: "06",
    label: "Engineering roles",
    note: "2020 — present",
  },
  {
    value: "03",
    label: "Languages",
    note: "JS · Python · Go",
  },
  {
    value: "02",
    label: "Active roles",
    note: "Bivo · Minestarters",
  },
];

export const workExperience: WorkExperience[] = [
  {
    id: "bivo",
    company: "Bivo",
    role: "Senior Frontend Developer",
    location: "Remote",
    period: "Aug 2025 — Present",
    startLabel: "2025.08",
    endLabel: "PRESENT",
    current: true,
    summary:
      "Leading frontend development on a creator-focused CRM platform, migrating legacy codebases to modern React architecture and driving performance, scalability, and maintainability.",
    responsibilities: [
      "Developing and maintaining a creator-focused CRM platform with modern React architecture and Redux for predictable state management.",
      "Migrating legacy codebases to updated frameworks and best practices to enhance performance, scalability, and maintainability.",
      "Utilizing Zustand for lightweight and efficient state synchronization across dynamic app modules.",
      "Collaborating closely with designers to translate UI/UX prototypes into responsive, high-performance product features.",
      "Implementing secure payment workflows and ensuring reliable transaction handling within the creator network.",
      "Streamlining feature delivery through continuous integration and deployment processes for faster release cycles.",
      "Contributing to overall application optimization and user experience improvements through code reviews and performance tuning.",
    ],
    stack: ["React", "Redux", "Zustand", "CI/CD", "Payments"],
  },
  {
    id: "minestarters",
    company: "Minestarters",
    role: "Frontend & Web3 Developer (Part-Time)",
    location: "Remote",
    period: "Dec 2025 — Present",
    startLabel: "2025.12",
    endLabel: "PRESENT",
    current: true,
    summary:
      "Developing a blockchain investment platform with React, Redux/Zustand, and Solidity — tokenizing mining assets and integrating DeFi wallets, real-time asset tracking, and milestone-based payouts.",
    responsibilities: [
      "Developing and maintaining Minestarters' blockchain investment platform using React, React Router, Redux/Zustand for state management, and Solidity for secure smart contract tokenization of mining assets.",
      "Integrating Web3 functionalities with ethers.js/web3.js for seamless DeFi wallets, real-time asset tracking, and milestone-based payouts in investor dashboards.",
      "Migrating legacy code to modern React patterns, optimizing performance and scalability for global user interfaces and transaction workflows.",
      "Collaborating on responsive UI/UX features and CI/CD pipelines to accelerate releases for platform expansions like project onboarding and partnerships.",
    ],
    stack: ["React", "React Router", "Redux", "Zustand", "Solidity", "ethers.js", "web3.js"],
  },
  {
    id: "niural",
    company: "Niural",
    role: "Frontend Developer",
    location: "Lalitpur, Nepal",
    period: "Jul 2024 — Jul 2025",
    startLabel: "2024.07",
    endLabel: "2025.07",
    current: false,
    summary:
      "Built a comprehensive payroll, HR, and finance platform with Web3 payment technology at its core — engineering SSR/SSG strategies for enterprise financial apps and integrating cryptocurrency payroll processing.",
    responsibilities: [
      "Actively working on development of a comprehensive payroll, HR, and finance platform with Web3 payment technology as its core functionality.",
      "Designed and optimized server-side rendering (SSR) and static site generation (SSG) strategies for enterprise-level financial applications.",
      "Integrated Web3 payment gateways and blockchain transaction modules enabling secure cryptocurrency payroll processing.",
      "Engineered reusable React components for streamlined HR workflows and employee management systems.",
      "Collaborated with blockchain teams to synchronize smart contract interactions with intuitive frontend interfaces.",
      "Implemented performance monitoring and state management using React Query and Zustand.",
      "Drove adoption of end-to-end testing with Cypress and component testing using Storybook.",
    ],
    stack: ["React", "Next.js", "SSR", "SSG", "React Query", "Zustand", "Cypress", "Storybook"],
  },
  {
    id: "neptune-mutual",
    company: "Neptune Mutual",
    role: "Frontend & Blockchain Developer",
    location: "Remote",
    period: "Jan 2022 — Jun 2024",
    startLabel: "2022.01",
    endLabel: "2024.06",
    current: false,
    summary:
      "Built a web3-based cryptocurrency insurance platform on React and Next.js — architecting modular SSR/CSR components, driving product roadmap execution, and improving test coverage with Jest and Cypress.",
    responsibilities: [
      "Extensively worked in development of a web3-based cryptocurrency insurance platform using React.js and Next.js.",
      "Architected modular components utilizing both server-side and client-side rendering strategies.",
      "Collaborated with cross-functional teams to execute product roadmap and optimize SPA architecture.",
      "Implemented state management solutions using Redux and Context API.",
      "Improved test coverage using Jest and Cypress.",
      "Maintained externally shared packages and libraries.",
    ],
    stack: ["React", "Next.js", "Redux", "Context API", "Jest", "Cypress"],
  },
  {
    id: "ida",
    company: "Infinity Digital Agency (IDA)",
    role: "Full-Stack Developer",
    location: "Ratopul, Kathmandu",
    period: "Jul 2021 — Dec 2021",
    startLabel: "2021.07",
    endLabel: "2021.12",
    current: false,
    summary:
      "Delivered full-stack React/Next.js applications with Node.js + Express + PostgreSQL + Prisma APIs, TypeScript, PWA features, and Swagger-documented endpoints.",
    responsibilities: [
      "Developed React.js applications using Next.js for improved SEO and performance.",
      "Designed RESTful APIs using Node.js and Express.js with PostgreSQL and Prisma ORM.",
      "Utilized TypeScript and implemented Progressive Web App features.",
      "Created API documentation using Swagger for seamless integration.",
      "Employed Postman for API testing and debugging.",
    ],
    stack: ["React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript", "PWA"],
  },
  {
    id: "berrybytes",
    company: "Berrybytes",
    role: "Frontend Developer",
    location: "Pulchowk, Lalitpur",
    period: "Apr 2020 — Jul 2021",
    startLabel: "2020.04",
    endLabel: "2021.07",
    current: false,
    summary:
      "Developed React core components, responsive designs with CSS3/SCSS, and researched JAMStack architectures including Hugo, Gatsby, and Strapi headless CMS.",
    responsibilities: [
      "Developed React core components and integrated with backend APIs.",
      "Implemented responsive designs using CSS3 and SCSS with cross-browser compatibility.",
      "Conducted research on JAMStack, exploring Hugo, Gatsby, and Strapi headless CMS.",
      "Led adoption of best code practices and comprehensive documentation.",
      "Collaborated with backend developers on RESTful endpoints using Golang and Gin.",
    ],
    stack: ["React", "CSS3", "SCSS", "JAMStack", "Gatsby", "Hugo", "Strapi", "Golang", "Gin"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    index: "FE",
    description: "Interface engineering, design systems, and component architecture across modern React ecosystems.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "ReactJS",
      "NextJS",
      "Gatsby",
      "AstroJS",
      "TypeScript",
      "Jest",
      "SCSS",
      "Styled Components",
      "Tailwind CSS",
      "Figma",
      "E2E Testing (Jest, Cypress)",
    ],
  },
  {
    id: "backend",
    label: "Backend · API · Hosting",
    index: "BE",
    description: "Server-side systems, REST and GraphQL APIs, databases, cloud infrastructure, and scheduling.",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "Golang",
      "Gin",
      "Swagger",
      "Postman",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Azure",
      "Cloudflare",
      "SQL",
      "NoSQL",
      "GraphQL",
      "REST",
      "Cron Jobs",
    ],
  },
  {
    id: "web3",
    label: "Web3 · Blockchain",
    index: "W3",
    description: "Smart contract development, decentralized finance integrations, and on-chain asset tooling.",
    items: [
      "Solidity",
      "Hardhat",
      "Mocha",
      "Chai",
      "IPFS",
      "Kubo",
      "Ethers.js",
      "Web3.js",
    ],
  },
  {
    id: "ml",
    label: "Machine Learning · AI",
    index: "ML",
    description: "Classical ML and deep learning — regression, nearest neighbors, support vector machines, and CNNs.",
    items: [
      "Scikit-learn",
      "Keras",
      "TensorFlow",
      "Pandas",
      "Matplotlib",
      "Regression",
      "KNN",
      "Support Vector Machines",
      "CNN",
    ],
  },
  {
    id: "ops",
    label: "Linux · Tooling",
    index: "OPS",
    description: "Operating systems, version control, containerization, and remote engineering practices.",
    items: [
      "Linux",
      "MacOS",
      "Windows",
      "Docker",
      "Shell Scripting",
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Remote Work",
      "Teamwork",
      "Quick Learning",
    ],
  },
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "neptune-mutual-blue",
    project: "Neptune Mutual",
    description:
      "Contributed to Neptune Mutual's open-source projects related to decentralized insurance solutions.",
    url: "https://github.com/neptune-mutual-blue",
  },
  {
    id: "station-dex",
    project: "Station DEX",
    description:
      "Actively participated in the development of Station DEX, contributing to decentralized exchange infrastructure and improving user experiences.",
    url: "https://github.com/station-dex",
  },
  {
    id: "github-file-icons",
    project: "github-file-icons",
    description:
      "Made contributions to github-file-icons — a Chrome extension that gives icons to files in the GitHub UI.",
    url: "https://github.com/homerchen19/github-file-icons",
  },
  {
    id: "commaai-flash",
    project: "commaai/flash",
    description:
      "Participating in the bounty program on commaai/flash — open-source contribution in progress.",
    url: "https://github.com/commaai/flash/issues/42",
  },
];

export const education: EducationItem[] = [
  {
    id: "mrcet",
    institution: "Malla Reddy College of Engineering & Technology",
    degree: "B.Tech in Computer Science & Engineering",
    location: "Hyderabad, India",
    date: "Jan 2020",
    note: "Affiliated with JNTUH.",
  },
  {
    id: "kalika",
    institution: "Kalika H.S.S",
    degree: "Intermediate Degree, Science",
    location: "Butwal, Nepal",
    date: "Mar 2016",
    note: "Obtained the Intermediate Degree in the Science stream.",
  },
  {
    id: "axis",
    institution: "Axis International School",
    degree: "School Leaving Certificate (SLC)",
    location: "Butwal, Nepal",
    date: "Aug 2014",
    note: "Acquired the School Leaving Certificate.",
  },
];

export const certifications: Certification[] = [
  {
    id: "ibm-fullstack",
    title: "Full-Stack JavaScript Developer",
    issuer: "IBM",
    date: "Aug 2021",
    description: "Mastered full-stack web development using JavaScript, Node.js, Express, and React.",
  },
  {
    id: "datacamp-tf",
    title: "Introduction to TensorFlow in Python",
    issuer: "Datacamp",
    date: "May 2020",
    description: "Gained proficiency in TensorFlow for building perceptron layers and CNNs.",
  },
  {
    id: "ms-ml",
    title: "Machine Learning with Python",
    issuer: "Microsoft",
    date: "Jun 2019",
    description: "Mastered regression, KNN, and support vector machines.",
  },
];

/** Ticker tape content — used as a "system status" marquee in the hero. */
export const tickerItems: string[] = [
  "STATUS // ACTIVE",
  "LOCATION // KATHMANDU, NP",
  "TIMEZONE // UTC+05:45",
  "STACK // REACT · NEXT.JS · NODE.JS",
  "WEB3 // SOLIDITY · ETHERS.JS · HARDHAT",
  "LANGS // JAVASCRIPT · PYTHON · GOLANG",
  "AVAILABILITY // OPEN TO NEW ROLES",
  "BUILD // 2026.07",
];

/** Section page meta — drives the telemetry labels + section numerals. */
export const sectionMeta = {
  overview: { index: "01", title: "Overview", file: "OVERVIEW.MD", numeral: "01" },
  experience: { index: "02", title: "Experience", file: "EXPERIENCE.LOG", numeral: "02" },
  stack: { index: "03", title: "Stack", file: "STACK.SPEC", numeral: "03" },
  openSource: { index: "04", title: "Open Source", file: "CONTRIB.LEDGER", numeral: "04" },
  education: { index: "05", title: "Credentials", file: "CREDENTIALS.DAT", numeral: "05" },
  contact: { index: "06", title: "Contact", file: "CONTACT.INI", numeral: "06" },
} as const;
