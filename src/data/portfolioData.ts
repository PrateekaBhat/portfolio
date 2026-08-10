import { Project, SkillItem, SkillCategory, CareerTrack, Playlist, AudioTrack } from '../types';

export const PROFILE_INFO = {
  name: "Prateeka Bhat",
  role: "Associate @ Goldman Sachs",
  title: "Software Engineer • Backend & Cloud Native • GenAI Architect",
  location: "Bengaluru, India",
  version: "Portfolio v1.0",
  bio: "Software Engineer with 5 years of experience designing and building scalable backend systems, microservices, and cloud native platforms using Java, Python, PostgreSQL, AWS, and Kubernetes. Skilled in developing GenAI-driven platforms, encompassing prompt engineering, agentic workflows, and MCP servers, with proficiency in AI tools such as GitHub Copilot and Claude Code. Experienced across the Agile/DevOps lifecycle, utilizing tools such as Jira and GitLab.",
  aboutDetailed: "Specializing in scalable backend systems, GenAI platforms, and cloud-native architecture. Dedicated to continuous learning and mentoring. Adept at agile methodologies and SDLC best practices using Jira, GitLab, and automated CI/CD pipelines.",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJRXhv4zaVwaaqqN3fLZafnVWAJp3mDcx68BEx2maiCpv5u2Z9o3C260nINbBoB9WsXhows1dAmnRmpU8jthE3Nj6jLOFroiwIw2jJCo-kLAua9Qm9zYlTqEELaf-ufM__Gvoll8NRj1hcBr3-W3K58DsXorX2i-krKAkf1FyyC5oEtRPWFJ_s5iLs8JzJyKKFp3c0ibebAb0qlWEZUwndnZ0B4j-s2bnmJYdmhK3fWaKmKRl_SJ8d",
  heroBgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJoMkqDpWv0MJRXM2Eg2voJpD5zK16xih8-3rDkE8VvCQuk5FfoVZSOCA6iHeyhS3-pgrglRXOWn_2BdMwU7ZJrkNybEhajMgX7AQM_DZzIguTWlH4QgOcsEpwETprCYyC5wGvsTAH-iXV-0ZK0rzewbHvF2HX87ecWTCo2xui8AJBeoaybFfapOzBNe9G3LRM_DM7gQ84HLA026BFqKsbtfRJvocnlo2KyZtOadJIYS7O4r3SwUzu",
  coverArtUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRfSi3O_52Db-EuOP7eF6sT9ToCVqFjCsLiRrxDp1KV51H0dn23Kc1RhRJUDYlCqzjcwA64jTSxEo91jbBF75J1YA3j1gocbpRD9WxzBvSX-8ncvjt15qm8A4tlaSgd-oa9eO4jIJ9W1iWXS_tqJQkCQ2p6WBsL52zhnRcid8KH4ySgKJA2g5Lt-d6UVutaNbaFaVefrO7pfqTwrCla5f42Yibw4qZe86kI2Yg72pG8aP8Z67sAAGN",
  linkedIn: "https://www.linkedin.com/in/prateeka-bhat-8944ab148/",
  github: "https://github.com/PrateekaBhat",
  email: "prateekabhat22@gmail.com"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "pr-sentinel",
    title: "PR Sentinel",
    subtitle: "Deterministic PR Risk Assessment",
    category: "Developer Tools",
    description: "Auditable pull-request risk assessment with deterministic release decisions and repository-grounded AI explanations.",
    fullDescription: "PR Sentinel evaluates pull requests using an auditable deterministic risk engine that produces `ALLOW`, `NEEDS_REVIEW`, or `BLOCK`. Repository-grounded LangGraph specialists use RAG and local Ollama inference to explain the risk  without having authority to change the release decision.",
    imageUrl: PROFILE_INFO.heroBgUrl,
    tags: ["Python", "FastAPI", "LangGraph", "Ollama", "ChromaDB", "GitHub Actions", "React"],
    metrics: "Specialist domains • deterministic release policy",
    duration: "1:15",
    audioText: "Welcome to PR Sentinel. PR Sentinel is a deterministic-first pull-request risk assessment system. It evaluates every pull request with auditable heuristics to produce an ALLOW, NEEDS_REVIEW, or BLOCK decision. Repository-grounded LangGraph specialists use RAG and local Ollama models to explain the risk and provide contextual engineering findings. The key principle is simple: AI explains the risk, but the deterministic policy engine decides it. The same analysis pipeline can be run through the CLI, GitHub Actions, or the React dashboard.",
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

export const TOP_SKILLS: SkillItem[] = [
  { id: "s1", name: "Java", category: "Languages", level: 95, description: "", tags: ["Backend"] },
  { id: "s2", name: "Python", category: "Languages", level: 92, description: "", tags: ["Data & AI"] },
  { id: "s3", name: "AWS & Cloud", category: "Cloud & DevOps", level: 88, description: "", tags: ["Cloud"] },
  { id: "s4", name: "GenAI & LLMs", category: "AI & ML", level: 85, description: "", tags: ["AI"] }
];

export const CHIP_SKILLS = [
  "ReactJs", "Postgres", "Typescript", "Kubernetes", "Node.js", "Docker", "GitLab CI", "AWS", "Python", "Java"
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

export const CAREER_TIMELINE: CareerTrack[] = [
  {
    id: 1,
    role: "Associate",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "01/2024 – Present",
    duration: "1 yr 8 mos",
    description: "Building GenAI-driven platforms, cloud migration pipelines, and microservice governance architectures.",
    highlights: [
      "Built the ingestion pipeline for a GenAI-powered cloud migration platform, transforming migration guidelines into vector embeddings to power context-aware, on-prem-to-AWS cloud service recommendations.",
      "Architected an automated LLM-as-judge evaluation framework using GPT and LangGraph to detect regressions in Claude-generated cloud migration plans, eliminating manual QA effort before feature releases.",
      "Built an LLM-powered Quality Analyzer in Python that automates capacity planning assessments and recommendations for application infrastructure.",
      "Automated data refresh and cleanup workflows using AWS EventBridge Scheduler and Lambda, improving pipeline reliability and reducing manual intervention.",
      "Increased service catalog ownership attribution by 92% by architecting the backend for an Application Hierarchy and Ownership Model, enabling SLO-driven monitoring.",
      "Achieved 100% initial data backfill into a centralized inventory system via custom Java REST APIs, unlocking real time visibility for downstream teams.",
      "Improved service catalog data quality by 57% by designing and building a rolling certification workflow that strengthened governance and audit compliance.",
      "Built a dependency graph covering 90% of owned infrastructure (hosts and databases) using Java and MongoDB, forming the foundation for disaster recovery testing.",
      "Led multiple GenAI and backend POCs, mentored junior engineers, and drove design reviews and code quality standards across the team."
    ],
    audioText: "As Associate at Goldman Sachs, Prateeka leads GenAI cloud migration platforms, automated LLM-as-judge evaluation frameworks, and microservice governance architectures."
  },
  {
    id: 2,
    role: "Analyst",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "08/2021 – 12/2023",
    duration: "2 yrs 5 mos",
    description: "Built microservices-based resilience dashboards, Python ETL pipelines, and managed CI/CD release cycles.",
    highlights: [
      "Built and maintained a microservices-based operational resilience dashboard, ensuring recovery coverage for 7,000+ business continuity plans.",
      "Engineered a Python-based ETL pipeline processing 500K+ records per day into a centralized data lake, powering Tableau dashboards that improved production-access governance by 50%.",
      "Owned pre/post-release validation and evidence collection for biweekly CI/CD release cycles across 5+ products while providing on-call production support and consistently delivering features ahead of sprint commitments in a cross-functional agile environment."
    ],
    audioText: "During her tenure as Analyst at Goldman Sachs, Prateeka built microservices operational resilience dashboards and Python ETL data pipelines."
  },
  {
    id: 3,
    role: "Seasonal Intern",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "02/2021 – 07/2021",
    duration: "6 mos",
    description: "Optimized metrics ingestion pipelines and Kubernetes pod resource allocations.",
    highlights: [
      "Improved stability of a metrics ingestion pipeline processing 40K+ jobs through telemetry analysis and Kubernetes pod resource allocation tuning, reducing job retries and resource contention."
    ],
    audioText: "As a Seasonal Intern at Goldman Sachs, Prateeka tuned Kubernetes resource allocation and telemetry analytics for metrics ingestion."
  },
  {
    id: 4,
    role: "Summer Intern",
    company: "Goldman Sachs",
    location: "Bengaluru, India",
    period: "06/2020 – 08/2020",
    duration: "3 mos",
    description: "Applied ML techniques to analyze software health indicators across enterprise applications.",
    highlights: [
      "Applied statistical and ML techniques to analyze relationship between software health indicators enabling hotspot detection across 50k+ products."
    ],
    audioText: "As a Summer Intern at Goldman Sachs, Prateeka applied ML techniques to analyze software health indicators."
  }
];

export const PODCAST_EPISODES = [
  {
    id: "pod-1",
    title: "NVIDIA AI Podcast",
    subtitle: "Explore how the latest technologies are transforming generative AI...",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    duration: "24 min",
    audioText: "Playing NVIDIA AI Podcast: Exploring breakthrough innovations in AI infrastructure and enterprise LLM deployment."
  },
  {
    id: "pod-2",
    title: "TED Tech",
    subtitle: "From the construction of virtual realities to the future of cloud backend systems...",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    duration: "18 min",
    audioText: "Playing TED Tech: How cloud native engineering and distributed microservices power global applications."
  }
];

export const DEFAULT_PLAYLISTS: Playlist[] = [
  {
    id: "pl-aws",
    name: "AWS Cloud",
    description: "Cloud-native services, Kubernetes clusters, and microservices architecture",
    itemCount: 1,
    items: ["pr-sentinel"]
  },
  {
    id: "pl-genai",
    name: "Generative AI 101",
    description: "LLM-as-judge frameworks, RAG architectures, and AI-driven automation",
    itemCount: 1,
    items: ["pr-sentinel"]
  },
  {
    id: "pl-webapps",
    name: "Web Apps",
    description: "Full-stack React, FastAPI, and TypeScript interactive web applications",
    itemCount: 1,
    items: ["pr-sentinel"]
  },
  {
    id: "pl-techtools",
    name: "Tech & Tools",
    description: "The complete collection of languages, frameworks, and tools in rotation",
    itemCount: 42,
    items: ["s1", "s2", "s3", "s4"]
  }
];

export const DEFAULT_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "track-main",
    title: "Prateeka Bhat - Portfolio v1.0",
    artist: "Prateeka Bhat",
    album: "Sonic Folio",
    coverUrl: PROFILE_INFO.coverArtUrl,
    duration: 242, // 4:02
    audioText: "Hello! Welcome to Prateeka Bhat's interactive portfolio. Prateeka is an Associate at Goldman Sachs specializing in scalable backend microservices, AWS cloud native systems, and GenAI platforms.",
    type: 'overview'
  },
  {
    id: "track-pr-sentinel",
    title: "PR Sentinel - Risk Analyzer",
    artist: "Prateeka Bhat",
    album: "Web Apps Playlist",
    coverUrl: PROFILE_INFO.heroBgUrl,
    duration: 194, // 3:14
    audioText: "PR Sentinel analyzes pull requests before deployment using Gemini models to detect security issues, test coverage gaps, and regression risks.",
    type: 'project'
  },
  {
    id: "track-gs-associate",
    title: "Career Track 1: Associate @ Goldman Sachs",
    artist: "Goldman Sachs",
    album: "Career Timeline",
    coverUrl: PROFILE_INFO.avatarUrl,
    duration: 160,
    audioText: "As Associate at Goldman Sachs, Prateeka leads GenAI cloud migration platforms and automated code evaluation systems.",
    type: 'skill'
  }
];
