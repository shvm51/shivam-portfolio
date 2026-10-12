/**
 * CENTRAL CONTENT FILE — edit everything here.
 *
 * Rules followed while populating this file:
 * - Only facts supplied in the project brief or verified from the user's
 *   own work are included.
 * - Anything missing is marked `status: "todo"` and the UI renders it as
 *   an elegant "details coming soon" note — never as a dead link.
 * - Nothing is invented: no fake testimonials, metrics, or experience.
 */

export type LinkStatus = "live" | "todo";

export interface SocialLink {
  label: string;
  href: string;
  status: LinkStatus;
  note?: string;
}

export const profile = {
  name: "Shivam Aghera",
  firstName: "Shivam",
  lastName: "Aghera",
  role: "CSE Student & Developer",
  degree: "B.Tech, Computer Science and Engineering",
  university: "Pimpri Chinchwad University",
  cgpa: "9.27",
  location: "Pune, India",
  tagline: "Engineering ideas into reality.",
  intro:
    "I build intelligent systems, thoughtful digital experiences, and technology that solves real problems.",
  about: [
    "I'm a Computer Science undergraduate at Pimpri Chinchwad University (CGPA 9.27) who treats engineering as a creative discipline. I work across AI, cybersecurity, and full-stack development — not as separate silos, but as tools that combine when a real problem demands it.",
    "My approach is simple: understand the problem deeply, prototype fast, and keep iterating until the thing actually works for real people. I learn by building — every concept I study turns into something running on a screen or a server.",
    "Beyond code, I lead design and technical work in university clubs, where I've learned that the hardest engineering problems are usually communication problems: aligning a team, scoping an event, shipping under a deadline.",
  ],
  interests: [
    "Artificial Intelligence",
    "Cybersecurity",
    "Software Development",
    "Creative Technology",
    "Real-World Problem Solving",
  ],
  // TODO: add your real email address
  email: { address: "", status: "todo" as LinkStatus },
  resumePath: "/resume.pdf",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/shvm51", status: "live" },
  // TODO: add your real LinkedIn profile URL
  { label: "LinkedIn", href: "", status: "todo", note: "Add your LinkedIn URL in src/data/portfolio.ts" },
];

export const navLabels = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  approach: string[];
  outcomes: string[];
  links: { label: string; href: string; status: LinkStatus }[];
  visual: "geospatial" | "medical" | "security" | "agri" | "generic";
  featured: boolean;
  statusNote?: string;
}

export const projects: Project[] = [
  {
    id: "agrisaarthi",
    index: "01",
    title: "AgriSaarthi",
    category: "AI · Full-Stack · SIH 2026",
    tagline: "An AI farming companion for India's smallholder farmers.",
    problem:
      "Smallholder farmers lack timely, personalized agronomic advice — disease spreads, irrigation is guesswork, and market prices are opaque.",
    solution:
      "A multilingual AI companion: crop disease detection from leaf photos, farm risk scoring, irrigation advice, market prices, and an AI assistant in English, Hindi, and Marathi.",
    role: "Builder — full-stack: FastAPI backend, Expo mobile app, Next.js PWA, Supabase schema, deployment.",
    stack: ["Python", "FastAPI", "React Native (Expo)", "Next.js", "TypeScript", "Supabase", "Docker"],
    approach: [
      "Modular FastAPI backend with 11 endpoints (disease detection, farm risk, irrigation, assistant)",
      "ML pipeline stubs with a preprocessing quality gate and deterministic crop scoring",
      "Expo mobile app with farmer-first bottom-tab UX and trilingual i18n",
      "Progressive Web App installable offline with service worker",
    ],
    outcomes: [
      "Live API on Railway and Render; live PWA on Vercel",
      "11-step verified demo flow (scan → detect → risk → advise)",
    ],
    links: [
      { label: "Live PWA", href: "https://agrisaarthi-iota.vercel.app", status: "live" },
      { label: "GitHub", href: "https://github.com/shvm51/agrisaarthi", status: "live" },
    ],
    visual: "agri",
    featured: true,
  },
  {
    id: "bharat-infrapulse",
    index: "02",
    title: "Bharat InfraPulse",
    category: "AI · Geospatial · Concept",
    tagline: "AI-powered infrastructure monitoring and decision support.",
    problem:
      "Civic infrastructure issues — broken roads, failing utilities — are reported in scattered channels, so prioritization is slow and opaque.",
    solution:
      "A concept platform connecting citizen reports, multimodal analysis, geospatial gap mapping, forecasting, and explainable prioritization for decision-makers.",
    role: "Concept & design — system architecture, data flow, dashboard mockups.",
    stack: ["Concept", "Geospatial visualization", "Multimodal AI (planned)"],
    approach: [
      "Citizen report ingestion pipeline (text + image)",
      "Geospatial clustering of infrastructure gaps on a live map",
      "Explainable prioritization model surfacing why an issue ranks high",
      "Forecasting layer for preventive maintenance planning",
    ],
    outcomes: [],
    links: [],
    visual: "geospatial",
    featured: true,
    statusNote: "Concept in development — architecture and mockups being refined.",
  },
  {
    id: "health-ai",
    index: "03",
    title: "Early Disease Prediction",
    category: "AI · Healthcare · Concept",
    tagline: "Machine learning for early risk signals in healthcare data.",
    problem:
      "Many conditions are most treatable when caught early, but risk signals hide across fragmented health records and checkups.",
    solution:
      "A proposed AI system that surfaces early risk signals from structured health data, with a clinician-facing dashboard — positioned as decision support, not diagnosis.",
    role: "Concept & design — problem framing, technical architecture, dashboard mockups.",
    stack: ["Concept", "Machine Learning (planned)", "Data visualization"],
    approach: [
      "Risk-signal modeling over structured health indicators",
      "Clinician dashboard with explainable risk factors",
      "Privacy-first data handling as a core design constraint",
    ],
    outcomes: [],
    links: [],
    visual: "medical",
    featured: true,
    statusNote:
      "Exploratory concept. No clinical claims — accuracy and deployment are unverified.",
  },
  {
    id: "cyber-threat-intel",
    index: "04",
    title: "Cyber Threat Intelligence",
    category: "Cybersecurity",
    tagline: "Threat detection, analysis workflow, and security tooling.",
    problem:
      "Details to be added — this project slot is reserved for a cybersecurity build.",
    solution:
      "Threat-detection problem, analysis workflow, and technical implementation will be documented here once available.",
    role: "To be documented.",
    stack: [],
    approach: [],
    outcomes: [],
    links: [],
    visual: "security",
    featured: false,
    statusNote: "Project details pending — update src/data/portfolio.ts when ready.",
  },
];

export interface SkillCategory {
  name: string;
  items: string[];
  note?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    items: ["TypeScript", "Python", "JavaScript", "SQL"],
  },
  {
    name: "Frontend Development",
    items: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend Development",
    items: ["FastAPI", "REST APIs", "Node.js"],
  },
  {
    name: "AI & Machine Learning",
    items: ["ML pipelines", "Model preprocessing", "Prompt engineering", "RAG concepts"],
    note: "Applied & learning — no proficiency claims",
  },
  {
    name: "Cybersecurity",
    items: ["Security fundamentals", "Threat analysis (learning)"],
    note: "Active interest area — growing",
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "Supabase", "SQLite"],
  },
  {
    name: "Developer Tools",
    items: ["Git & GitHub", "Docker", "Vercel", "Railway", "Render", "Linux"],
  },
  {
    name: "Design & Creative Technology",
    items: ["UI/UX design", "Design systems", "Motion design", "Figma"],
  },
];

export interface Experience {
  role: string;
  org: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Design Head",
    org: "PCU Developers Club",
    period: "2024 — Present",
    description:
      "Leading the visual and experience direction for the club's technical presence.",
    highlights: [
      "Own the design language across club projects and event identities",
      "Bridge design and engineering so interfaces ship as designed",
    ],
  },
  {
    role: "Technical Head",
    org: "PCU Cultural Club",
    period: "2024 — Present",
    description:
      "Owning the club's digital platform — public site, registrations, and operations tooling.",
    highlights: [
      "Led the rebuild of the club's digital platform (events, QR-ticket registration, admin portal)",
      "Coordinate technical execution across event timelines",
    ],
  },
  {
    role: "Event Lead",
    org: "PCU Pitch Fest 2.0",
    period: "2025",
    description:
      "Leading planning and execution for the university's flagship pitch event.",
    highlights: [
      "Drive end-to-end event planning: format, judging, logistics",
      "Coordinate teams under real deadlines",
    ],
  },
];

export interface Achievement {
  title: string;
  detail: string;
  year: string;
}

export const achievements: Achievement[] = [
  {
    title: "CGPA 9.27",
    detail: "B.Tech Computer Science & Engineering, Pimpri Chinchwad University",
    year: "2026",
  },
  {
    title: "Smart India Hackathon 2026",
    detail: "Building AgriSaarthi — AI farming companion (in progress)",
    year: "2026",
  },
  // TODO: add hackathons, certifications, awards as they are verified
];

export const contact = {
  headline: "Got an idea worth building?",
  subline:
    "I'm always up for interesting problems — internships, collaborations, or just a good technical conversation.",
  // Email + LinkedIn intentionally left blank — fill in src/data/portfolio.ts
};
