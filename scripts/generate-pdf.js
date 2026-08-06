import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  unit: 'pt',
  format: 'letter'
});

const pageWidth = doc.internal.pageSize.getWidth(); // ~612pt
const margin = 36; // 0.5 in
const contentWidth = pageWidth - margin * 2;
let y = 38;

function addSectionHeader(title) {
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(0, 0, 0);
  doc.text(title.toUpperCase(), margin, y);
  y += 3;
  doc.setLineWidth(0.75);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, y, margin + contentWidth, y);
  y += 11;
}

// Name Header
doc.setFont('times', 'bold');
doc.setFontSize(20);
doc.setTextColor(0, 0, 0);
doc.text('Prateeka Bhat', pageWidth / 2, y, { align: 'center' });
y += 16;

// Contact line with interactive email and LinkedIn hyperlink
doc.setFont('times', 'normal');
doc.setFontSize(9.5);

const part1 = "Bengaluru, India  |  +91 9481345595  |  ";
const part2 = "prateekabhat22@gmail.com";
const part3 = "  |  ";
const part4 = "linkedin.com/in/Prateeka";

const w1 = doc.getTextWidth(part1);
const w2 = doc.getTextWidth(part2);
const w3 = doc.getTextWidth(part3);
const w4 = doc.getTextWidth(part4);

const totalW = w1 + w2 + w3 + w4;
let startX = (pageWidth - totalW) / 2;

// Part 1: Location & Phone
doc.setTextColor(0, 0, 0);
doc.text(part1, startX, y);
startX += w1;

// Part 2: Email
doc.setTextColor(0, 0, 0);
doc.text(part2, startX, y);
doc.link(startX, y - 8, w2, 10, { url: 'mailto:prateekabhat22@gmail.com' });
startX += w2;

// Part 3: Separator
doc.setTextColor(0, 0, 0);
doc.text(part3, startX, y);
startX += w3;

// Part 4: LinkedIn Hyperlink (Blue, Underlined, Clickable!)
doc.setTextColor(0, 0, 238);
doc.text(part4, startX, y);
doc.setDrawColor(0, 0, 238);
doc.setLineWidth(0.5);
doc.line(startX, y + 1.5, startX + w4, y + 1.5);
doc.link(startX, y - 8, w4, 10, { url: 'https://www.linkedin.com/in/prateeka-bhat-8944ab148/' });
y += 18;

// SUMMARY
addSectionHeader('SUMMARY');
doc.setFont('times', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(0, 0, 0);
const summaryText =
  'Software Engineer with 5 years of experience designing and building scalable backend systems, microservices, and cloud-native platforms using Java, Python, PostgreSQL, AWS, and Kubernetes. Skilled in developing GenAI-driven platforms, encompassing prompt engineering, agentic workflows, and MCP servers, with proficiency in AI tools such as GitHub Copilot and Claude Code. Experienced across the Agile/DevOps lifecycle, utilizing tools such as Jira and GitLab.';
const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
doc.text(summaryLines, margin, y);
y += summaryLines.length * 11 + 6;

// TECHNICAL SKILLS
addSectionHeader('TECHNICAL SKILLS');
const skills = [
  { cat: 'Programming Languages', val: 'Java, Python, TypeScript' },
  { cat: 'Frameworks & Libraries', val: 'Dropwizard, React.js, Node.js, FastAPI, JUnit, TaskIq, GraphQL' },
  { cat: 'Generative AI', val: 'Semantic Search, Prompt engineering, Agent Skills, MCP, LangGraph, LLM-as-judge evaluation' },
  { cat: 'Cloud & Infrastructure', val: 'AWS (ECS, S3, Lambda, EventBridge, ElastiCache), Kubernetes, Docker, Terraform' },
  { cat: 'Databases & Data Platforms', val: 'MongoDB, PostgreSQL, Sybase, Redis, Snowflake, SQL, Amazon Aurora' },
  { cat: 'Authentication & Authorization', val: 'PingFederate, JWT, Kong' }
];

doc.setFontSize(9.5);
skills.forEach((s) => {
  doc.setFont('times', 'bold');
  const catText = `${s.cat}: `;
  doc.text(catText, margin, y);
  const catWidth = doc.getTextWidth(catText);
  doc.setFont('times', 'normal');
  const valLines = doc.splitTextToSize(s.val, contentWidth - catWidth);
  doc.text(valLines, margin + catWidth, y);
  y += valLines.length * 10.5;
});
y += 6;

// PROFESSIONAL EXPERIENCE
addSectionHeader('PROFESSIONAL EXPERIENCE');

const experiences = [
  {
    company: 'Goldman Sachs, ',
    role: 'Associate',
    dates: '01/2024 – Present, Bengaluru',
    bullets: [
      'Built the ingestion pipeline for a GenAI-powered cloud migration platform, transforming migration guidelines into vector embeddings to power context-aware, on-prem-to-AWS cloud service recommendations.',
      'Architected an automated LLM-as-judge evaluation framework using GPT and LangGraph to detect regressions in Claude-generated cloud migration plans, eliminating manual QA effort before feature releases.',
      'Built an LLM-powered Quality Analyzer in Python that automates capacity planning assessments and recommendations for application infrastructure.',
      'Automated data refresh and cleanup workflows using AWS EventBridge Scheduler and Lambda, improving pipeline reliability and reducing manual intervention.',
      'Increased service catalog ownership attribution by 92% by architecting the backend for an Application Hierarchy and Ownership Model, enabling SLO-driven monitoring.',
      'Achieved 100% initial data backfill into a centralized inventory system via custom Java REST APIs, unlocking real-time visibility for downstream teams.',
      'Improved service catalog data quality by 57% by designing and building a rolling certification workflow that strengthened governance and audit compliance.',
      'Built a dependency graph covering 90% of owned infrastructure (hosts and databases) using Java and MongoDB, forming the foundation for disaster recovery testing.',
      'Led multiple GenAI and backend POCs, mentored junior engineers, and drove design reviews and code quality standards across the team.'
    ]
  },
  {
    company: 'Goldman Sachs, ',
    role: 'Analyst',
    dates: '08/2021 – 12/2023, Bengaluru',
    bullets: [
      'Built and maintained a microservices-based operational resilience dashboard, ensuring recovery coverage for 7,000+ business continuity plans.',
      'Engineered a Python-based ETL pipeline processing 500K+ records per day into a centralized data lake, powering Tableau dashboards that improved production-access governance by 50%.',
      'Owned pre/post-release validation and evidence collection for biweekly CI/CD release cycles across 5+ products while providing on-call production support and consistently delivering features ahead of sprint commitments in a cross-functional agile environment.'
    ]
  },
  {
    company: 'Goldman Sachs, ',
    role: 'Seasonal Intern',
    dates: '02/2021 – 07/2021, Bengaluru',
    bullets: [
      'Improved stability of a metrics ingestion pipeline processing 40K+ jobs through telemetry analysis and Kubernetes pod resource allocation tuning, reducing job retries and resource contention.'
    ]
  },
  {
    company: 'Goldman Sachs, ',
    role: 'Summer Intern',
    dates: '06/2020 – 08/2020, Bengaluru',
    bullets: [
      'Applied statistical and ML techniques to analyze relationship between software health indicators enabling hotspot detection across 50k+ products.'
    ]
  }
];

experiences.forEach((exp) => {
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text(exp.company, margin, y);
  const compW = doc.getTextWidth(exp.company);

  doc.setFont('times', 'italic');
  doc.text(exp.role, margin + compW, y);

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.text(exp.dates, margin + contentWidth, y, { align: 'right' });
  y += 11;

  doc.setFont('times', 'normal');
  exp.bullets.forEach((bullet) => {
    const bulletIndent = 12;
    const bulletWidth = contentWidth - bulletIndent;
    const lines = doc.splitTextToSize(bullet, bulletWidth);
    doc.text('•', margin + 3, y);
    doc.text(lines, margin + bulletIndent, y);
    y += lines.length * 10;
  });
  y += 4;
});

// EDUCATION
addSectionHeader('EDUCATION');
doc.setFont('times', 'bold');
doc.setFontSize(9.5);
doc.text('Bachelor of Engineering in Information Science (GPA: 9.34/10)', margin, y);
doc.setFont('times', 'normal');
doc.setFontSize(9.5);
doc.text('08/2017 – 08/2021, Bengaluru', margin + contentWidth, y, { align: 'right' });
y += 11;
doc.setFont('times', 'italic');
doc.text('BMS College of Engineering', margin, y);

const outputDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(path.join(outputDir, 'Prateeka_Bhat_Resume.pdf'), pdfBuffer);
console.log('Resume PDF generated successfully at public/Prateeka_Bhat_Resume.pdf');
