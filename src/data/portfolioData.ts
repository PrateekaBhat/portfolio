import { Project, SkillCategory, CareerTrack, EducationEntry } from '../types';
import prSentinelCover from '../assets/pr-sentinel-cover.png';
import goldmanSachsLogo from '../assets/goldman-sachs-logo.png';
import bmsCollegeLogo from '../assets/bms-college-logo.png';

export const PROFILE_INFO = {
  name: "Prateeka Bhat",
  role: "Associate @ Goldman Sachs",
  location: "Bengaluru, India",
  version: "Portfolio v1.0",
  aboutDetailed: `I’m a software engineer based in Bengaluru, India, with 5 years of experience building reliable backend systems, cloud-native applications, and GenAI-powered solutions.

I enjoy solving problems where software needs to be more than functional. It needs to be scalable, observable, and dependable in production. My work has spanned backend engineering, cloud platforms, data pipelines, and generative AI, with a growing interest in building practical and reliable AI-powered systems.

I believe good engineering starts with understanding the problem deeply, building thoughtfully, and continuously learning along the way.

I also care deeply about documenting the systems I build, from implementation details and architectural decisions to lessons learned. I believe sharing knowledge makes systems easier to understand, maintain, and build upon. I enjoy mentoring others, collaborating across teams, and turning what I learn into documentation that others can benefit from.`,
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJRXhv4zaVwaaqqN3fLZafnVWAJp3mDcx68BEx2maiCpv5u2Z9o3C260nINbBoB9WsXhows1dAmnRmpU8jthE3Nj6jLOFroiwIw2jJCo-kLAua9Qm9zYlTqEELaf-ufM__Gvoll8NRj1hcBr3-W3K58DsXorX2i-krKAkf1FyyC5oEtRPWFJ_s5iLs8JzJyKKFp3c0ibebAb0qlWEZUwndnZ0B4j-s2bnmJYdmhK3fWaKmKRl_SJ8d",
  heroBgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJoMkqDpWv0MJRXM2Eg2voJpD5zK16xih8-3rDkE8VvCQuk5FfoVZSOCA6iHeyhS3-pgrglRXOWn_2BdMwU7ZJrkNybEhajMgX7AQM_DZzIguTWlH4QgOcsEpwETprCYyC5wGvsTAH-iXV-0ZK0rzewbHvF2HX87ecWTCo2xui8AJBeoaybFfapOzBNe9G3LRM_DM7gQ84HLA026BFqKsbtfRJvocnlo2KyZtOadJIYS7O4r3SwUzu",
  coverArtUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRfSi3O_52Db-EuOP7eF6sT9ToCVqFjCsLiRrxDp1KV51H0dn23Kc1RhRJUDYlCqzjcwA64jTSxEo91jbBF75J1YA3j1gocbpRD9WxzBvSX-8ncvjt15qm8A4tlaSgd-oa9eO4jIJ9W1iWXS_tqJQkCQ2p6WBsL52zhnRcid8KH4ySgKJA2g5Lt-d6UVutaNbaFaVefrO7pfqTwrCla5f42Yibw4qZe86kI2Yg72pG8aP8Z67sAAGN",
  linkedIn: "https://www.linkedin.com/in/prateeka-bhat-8944ab148/",
  github: "https://github.com/PrateekaBhat",
  medium: "https://medium.com/@prateekabhat",
  email: "prateekabhat22@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1J9-u8TUH01I-BVOOc_BhYerCPxRmjr3U/view?usp=sharing"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "pr-sentinel",
    title: "PR Sentinel",
    subtitle: "Deterministic PR Risk Assessment",
    category: "Developer Tools",
    description: "Auditable pull-request risk assessment with deterministic release decisions and repository-grounded AI explanations.",
    fullDescription: "PR Sentinel evaluates pull requests using an auditable deterministic risk engine that produces `ALLOW`, `NEEDS_REVIEW`, or `BLOCK`. Repository-grounded LangGraph specialists use RAG and local Ollama inference to explain the risk  without having authority to change the release decision.",
    imageUrl: prSentinelCover,
    tags: ["Python", "FastAPI", "LangGraph", "Ollama", "ChromaDB", "GitHub Actions", "React"],
    duration: "1:15",
    githubUrl: "https://github.com/PrateekaBhat/pr-sentinel",
    liveUrl: "https://github.com/PrateekaBhat/pr-sentinel#demos",
    architectureHighlights: [
      "Deterministic heuristics and policy own the release decision",
      "Repository-grounded RAG with LangGraph specialist agents",
      "Bounded and validated AI findings with groundedness checks",
      "GitHub Actions, CLI, and React dashboard use the same analysis pipeline"
    ],
    isLiked: true
  }
];

export const WRITING_DATA = [
  {
    id: "how-i-built-my-portfolio",
    title: "How I Built My Portfolio Website with AI in 2026",
    excerpt: "Curious how I built it? Read the story behind the portfolio and how AI helped turn the initial idea into a finished website.",
    url: "https://medium.com/@prateekabhat/how-i-built-my-portfolio-website-with-ai-in-2026-0abd47af8a50",
    readTime: "8 min read",
    source: "Medium"
  }
];

export const TECHNICAL_SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages for backend and AI development.",
    items: ["Java", "Python", "TypeScript", "SQL"]
  },
  {
    title: "AI & LLM Technologies",
    description: "Building intelligent, agentic AI applications.",
    items: ["LangGraph", "Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)", "Semantic Search", "Prompt Engineering", "Agent Skills", "LLM-as-Judge Evaluation"]
  },
  {
    title: "AI Developer Tools",
    description: "AI-powered tools for faster software development.",
    items: ["Claude Code", "GitHub Copilot", "AntiGravity", "Codex", "Cursor"]
  },
  {
    title: "Backend Technologies",
    description: "Frameworks for scalable APIs and microservices.",
    items: ["Dropwizard", "FastAPI", "Node.js", "GraphQL", "Maven", "JUnit", "TaskIQ"]
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment technologies.",
    items: ["AWS (ECS, Lambda, S3, EventBridge, ElastiCache)", "Kubernetes", "Docker", "Terraform"]
  },
  {
    title: "Databases",
    description: "Relational, NoSQL, and caching solutions.",
    items: ["PostgreSQL", "MongoDB", "Amazon Aurora", "Redis", "Snowflake", "Sybase"]
  },
  {
    title: "Frontend",
    description: "Modern web application development.",
    items: ["React.js", "Vite"]
  },
  {
    title: "API Gateway & Authentication",
    description: "Secure API access and identity management.",
    items: ["Kong", "JWT", "PingFederate"]
  },
  {
    title: "Developer Tools",
    description: "Development and collaboration platforms.",
    items: ["GitHub", "GitLab", "IntelliJ IDEA", "VS Code", "PyCharm", "Jira", "Confluence"]
  }
];

export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: "bms",
    degree: "Bachelor of Engineering, Information Science",
    institution: "BMS College of Engineering",
    location: "Bengaluru, India",
    period: "08/2017 – 08/2021",
    gpa: "9.34/10",
    highlights: [
      "Graduated with a strong foundation in data structures, algorithms, databases, and various programming languages.",
      "Coursework spanned software engineering, computer networks, and machine learning fundamentals."
    ],
    logoUrl: bmsCollegeLogo
  }
];

export const CAREER_TIMELINE: CareerTrack[] = [
  {
    id: 1,
    role: "Associate",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "01/2024 – Present",
    duration: "1 yr 8 mos",
    employmentType: "Full-time",
    logoUrl: goldmanSachsLogo,
    responsibilities: [
      "Architect and build the ingestion pipeline for a GenAI-powered cloud migration platform, transforming migration guidelines into vector embeddings to enable context-aware recommendations.",
      "Design and implement an automated LLM-as-a-judge evaluation framework using GPT and LangGraph to detect application regressions before production releases.",
      "Design and implement service catalog integrations to reliably synchronize service ownership and metadata with a centralized inventory system.",
      "Lead GenAI and backend proof-of-concepts, mentor junior engineers, and drive technical design reviews, engineering standards, and code quality across the team."
    ],
    whatILearned: [
      "Developed hands-on expertise in AWS and cloud-native development, including deploying and operating applications in the cloud.",
      "Developed practical expertise applying generative AI and LLM techniques to production systems, emphasizing evaluation, reliability, and maintainability.",
      "Strengthened cross-functional communication and stakeholder management by collaborating with external teams and resolving technical dependencies."
    ],
    impact: [
      "Increased service catalog ownership attribution by 92% by architecting the backend for an Application Hierarchy and Ownership Model.",
      "Achieved 100% initial data backfill into a centralized inventory system via custom Java REST APIs.",
      "Improved service catalog data quality by 57% through a rolling certification workflow.",
    ]
  },
  {
    id: 2,
    role: "Analyst",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "08/2021 – 12/2023",
    duration: "2 yrs 5 mos",
    employmentType: "Full-time",
    logoUrl: goldmanSachsLogo,
    responsibilities: [
      "Build and maintain a microservices-based operational resilience dashboard providing visibility into business continuity plans across the organization.",
      "Engineer a Python-based ETL pipeline that feeds a centralized data lake powering governance and reporting dashboards.",
      "Own pre- and post-release validation, evidence collection, and on-call production support across 5+ products."
    ],
    whatILearned: [
      "Developed end-to-end experience operating and supporting production systems, including on-call responsibilities.",
      "Developed expertise in migrating data and business logic from legacy tools to modern systems.",
      "Strengthened cross-functional collaboration and experience working across engineering and business teams."
    ],
    impact: [
      "Ensured recovery coverage across 7,000+ business continuity plans.",
      "Improved production-access governance by 50% through Tableau dashboards powered by the ETL pipeline.",
      "Delivered reliable, production-ready features across sprint cycles in a cross-functional Agile environment."
    ]
  },
  {
    id: 3,
    role: "Seasonal Intern",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "02/2021 – 07/2021",
    duration: "5 mos",
    employmentType: "Internship",
    logoUrl: goldmanSachsLogo,
    responsibilities: [
      "Analyze telemetry from a metrics ingestion pipeline processing 40K+ jobs to identify stability bottlenecks.",
      "Tune Kubernetes pod resource allocations to reduce pod crashes and job retries."
    ],
    whatILearned: [
      "Developed skills in debugging and analyzing production telemetry data to diagnose reliability issues.",
      "Built foundations in clean code principles and modular software design."
    ],
    impact: [
      "Reduced job retries and pod restarts across a pipeline processing 40K+ jobs."
    ]
  },
  {
    id: 4,
    role: "Summer Intern",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "06/2020 – 08/2020",
    duration: "2 mos",
    employmentType: "Internship",
    logoUrl: goldmanSachsLogo,
    responsibilities: [
      "Apply statistical and ML techniques to analyze relationships between software health indicators across enterprise products."
    ],
    whatILearned: [
      "Gained hands-on experience applying and evaluating statistical and ML techniques across real-world datasets."
    ],
    impact: [
      "Enabled hotspot detection across 50,000+ products through the health-indicator analysis."
    ]
  }
];

