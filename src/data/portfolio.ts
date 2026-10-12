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
  location: "Surat, Gujarat",
  phone: "+91 93135 92099",
  tagline: "Engineering ideas into reality.",
  intro:
    "B.Tech Computer Science Engineering student at Pimpri Chinchwad University with hands-on experience in Python development and campus outreach, and project work spanning AI-driven infrastructure intelligence, cyber threat analysis, and healthcare applications.",
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
  email: { address: "shivamaghera51@gmail.com", status: "live" as LinkStatus },
  resumePath: "/resume.pdf",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/shvm51", status: "live" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivamaghera", status: "live" },
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
    category: "AI · Geospatial · In Progress",
    tagline: "AI-powered citizen demand & infrastructure investment intelligence.",
    problem:
      "Infrastructure demand from citizens arrives as scattered, multilingual reports — demand and supply stay misaligned, and investment decisions lack explainable grounding.",
    solution:
      "An AI platform that structures multilingual citizen text, voice, and photo reports, then layers demand clustering, demand–supply gap analysis, forecasting, explainable priority scoring, and budget-scenario planning.",
    role: "Contributed to the proposed AI workflow — structuring multilingual reports, demand clustering, gap analysis, forecasting, explainable priority scoring, budget-scenario planning.",
    stack: ["Concept", "Geospatial visualization", "Multimodal AI (planned)"],
    approach: [
      "Multilingual citizen report ingestion (text, voice, photo)",
      "Demand clustering and demand–supply gap analysis",
      "Explainable priority scoring for investment decisions",
      "Forecasting and budget-scenario planning layer",
    ],
    outcomes: [],
    links: [],
    visual: "geospatial",
    featured: true,
    statusNote: "In progress — AI workflow and architecture being refined.",
  },
  {
    id: "aarogya-ai",
    index: "03",
    title: "AarogyaAI",
    category: "AI · Healthcare",
    tagline: "Multi-disease risk prediction with an interpretable patient journey.",
    problem:
      "Early risk signals for common conditions hide across fragmented checkups, and patients lack clear guidance from first concern to specialist care.",
    solution:
      "A multi-disease risk prediction workflow covering diabetes, heart disease, hypertension, liver, and kidney disease — ensemble models, interpretable risk factors, and a patient journey from chatbot guidance to specialist recommendations, appointments, and reports.",
    role: "Contributed to the design of the multi-disease risk prediction workflow — ensemble models, interpretable risk factors, and the end-to-end patient journey.",
    stack: ["Concept", "Machine Learning (planned)", "Data visualization"],
    approach: [
      "Ensemble models over multi-disease risk indicators",
      "Interpretable risk factors surfaced to patients and clinicians",
      "Chatbot-guided journey: concern → recommendation → appointment → report",
      "Privacy-first data handling as a core design constraint",
    ],
    outcomes: [],
    links: [],
    visual: "medical",
    featured: true,
    statusNote:
      "Design-stage concept. No clinical claims — accuracy and deployment are unverified.",
  },
  {
    id: "cyber-cep",
    index: "04",
    title: "CyberCEP",
    category: "Cybersecurity · Real-Time",
    tagline: "Real-time cyber threat intelligence platform.",
    problem:
      "Attack signals — brute force, SYN floods, port scans, APT activity — arrive as raw event streams; analysts need real-time detection with explainable alerts.",
    solution:
      "A Python event-processing pipeline on a Kafka-style publish–subscribe bus with sliding windows: rule-based detection for brute force, SYN floods, port scans, APT kill chains, and credential stuffing, plus Isolation Forest anomaly detection and alert visualization.",
    role: "Built the Python event-processing pipeline — Kafka-style pub-sub, sliding windows, rule-based detection, Isolation Forest anomaly detection, alert visualization.",
    stack: ["Python", "Kafka-style pub-sub", "Isolation Forest", "Stream processing"],
    approach: [
      "Event pipeline with sliding-window stream processing",
      "Rule-based detection: brute force, SYN floods, port scans, APT kill chains, credential stuffing",
      "Isolation Forest anomaly detection over event features",
      "Alert visualization for analyst triage",
    ],
    outcomes: [],
    links: [],
    visual: "security",
    featured: false,
    statusNote: "2026 — implementation details being documented.",
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
    items: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS", "Embedded C"],
  },
  {
    name: "Frameworks & Backend",
    items: ["Django", "FastAPI", "REST APIs", "Node.js"],
  },
  {
    name: "Frontend Development",
    items: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "AI & Machine Learning",
    items: ["AI/ML concepts", "LLM integrations", "ML pipelines", "Model preprocessing"],
    note: "Applied & learning — no proficiency claims",
  },
  {
    name: "Cybersecurity",
    items: ["Cybersecurity fundamentals", "Threat analysis (learning)"],
    note: "Active interest area — growing",
  },
  {
    name: "Embedded & Hardware",
    items: ["Arduino", "Embedded C"],
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
    name: "Methodologies",
    items: ["Agile fundamentals", "Data Structures & Algorithms"],
  },
  {
    name: "Design & Creative Technology",
    items: ["UI/UX design", "Design systems", "Motion design", "Figma"],
  },
  {
    name: "Soft Skills",
    items: ["Teamwork & Collaboration", "Leadership", "Communication", "Problem Solving", "Time Management", "Adaptability"],
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
    role: "Python Developer Intern",
    org: "QSkill",
    period: "July — August 2026",
    description:
      "One-month internship focused on Python development and practical programming tasks.",
    highlights: [
      "Shipped practical Python programming tasks in a professional workflow",
    ],
  },
  {
    role: "Campus Ambassador",
    org: "AllCollegeEvent.com (ACE)",
    period: "August 2026 — Present",
    description:
      "Supporting campus outreach — connecting students with college events and activities.",
    highlights: [
      "Share event opportunities across campus channels",
      "Connect students with college-related events and activities",
    ],
  },
  {
    role: "Design Head",
    org: "PCU Developers Club",
    period: "2026 — Present",
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
    period: "2026 — Present",
    description:
      "Owning the club's digital platform — public site, registrations, and operations tooling.",
    highlights: [
      "Led the rebuild of the club's digital platform (events, QR-ticket registration, admin portal)",
      "Coordinate technical execution across event timelines",
    ],
  },
  {
    role: "Coordinator",
    org: "TEDx PCU",
    period: "2026",
    description:
      "Coordinating operations for the university's TEDx event.",
    highlights: ["Cross-team coordination under event deadlines"],
  },
  {
    role: "Event Lead",
    org: "PCU Pitch Fest 2.0",
    period: "2026",
    description:
      "Leading planning and execution for the university's flagship pitch event.",
    highlights: [
      "Drive end-to-end event planning: format, judging, logistics",
      "Coordinate teams under real deadlines",
    ],
  },
  {
    role: "Management Team",
    org: "Ideathon 2k26 (24-Hour Event)",
    period: "2026",
    description:
      "Management role for a 24-hour ideathon event.",
    highlights: ["Event operations and participant experience"],
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
  {
    title: "Agile Project Management — Google",
    detail: "Certification",
    year: "2026",
  },
  {
    title: "Foundations of Cybersecurity — Google",
    detail: "Certification",
    year: "2026",
  },
  {
    title: "Django Web Framework — Meta",
    detail: "Certification",
    year: "2026",
  },
];

export const contact = {
  headline: "Got an idea worth building?",
  subline:
    "I'm always up for interesting problems — internships, collaborations, or just a good technical conversation.",
};
