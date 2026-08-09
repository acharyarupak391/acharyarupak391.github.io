export type ExperienceItem = {
  company: string;
  logoLabel: string;
  logoLines?: [string, string];
  role: string;
  period: string;
  location: string;
  color: string;
  dotColor: string;
  highlights: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Altus Minds",
    logoLabel: "altus minds",
    logoLines: ["altus", "minds"],
    role: "Frontend Developer",
    period: "Aug 2024 – Present",
    location: "Remote",
    color: "bg-neo-pink",
    dotColor: "bg-neo-pink",
    highlights: [
      "Developing creator-focused CRM platform with modern React architecture",
      "Migrating legacy codebases to updated frameworks",
      "Implementing secure payment workflows",
      "Utilizing Zustand for state synchronization",
    ],
  },
  {
    company: "Niural",
    logoLabel: "niural",
    role: "Frontend Developer",
    period: "Jul 2024 – Jul 2025",
    location: "Lalitpur, Nepal",
    color: "bg-neo-blue",
    dotColor: "bg-neo-blue",
    highlights: [
      "Developing comprehensive payroll, HR, and finance platform with Web3",
      "Integrated Web3 payment gateways and blockchain transactions",
      "Implemented E2E testing with Cypress and Storybook",
      "Engineered reusable React components for HR workflows",
    ],
  },
  {
    company: "Neptune Mutual",
    logoLabel: "neptune mutual",
    logoLines: ["neptune", "mutual"],
    role: "Frontend & Blockchain Developer",
    period: "Jan 2022 – Jun 2024",
    location: "Remote",
    color: "bg-neo-green",
    dotColor: "bg-neo-green",
    highlights: [
      "Developed web3-based cryptocurrency insurance platform",
      "Architected modular components with SSR and CSR strategies",
      "Implemented state management with Redux and Context API",
      "Maintained externally shared packages and libraries",
    ],
  },
  {
    company: "Infinity Digital Agency",
    logoLabel: "∞",
    role: "Full-stack Developer",
    period: "Jul 2021 – Dec 2021",
    location: "Ratopul, Kathmandu",
    color: "bg-neo-orange",
    dotColor: "bg-neo-orange",
    highlights: [
      "Developed React.js applications using Next.js",
      "Designed RESTful APIs using Node.js and Express.js",
      "Utilized TypeScript and PWA features",
      "Created API documentation using Swagger",
    ],
  },
  {
    company: "Berrybytes",
    logoLabel: "berry bytes",
    logoLines: ["berry", "bytes"],
    role: "Frontend Developer",
    period: "Apr 2020 – Jul 2021",
    location: "Pulchowk, Lalitpur",
    color: "bg-neo-yellow",
    dotColor: "bg-neo-yellow",
    highlights: [
      "Built responsive web applications with modern JavaScript",
      "Collaborated with designers to implement pixel-perfect UI",
      "Optimized performance and improved accessibility",
      "Integrated REST APIs and third-party services",
    ],
  },
];
