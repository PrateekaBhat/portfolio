import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { PROFILE_INFO, CAREER_TIMELINE } from '../../data/portfolioData';

interface ResumeViewProps {
  onOpenHireMe?: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = () => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const technicalSkillsList = [
    { category: "Programming Languages", items: "Java, Python, TypeScript" },
    { category: "Frameworks & Libraries", items: "Dropwizard, React.js, Node.js, FastAPI, JUnit, TaskIq, GraphQL" },
    { category: "Generative AI", items: "Semantic Search, Prompt engineering, Agent Skills, MCP, LangGraph, LLM-as-judge evaluation" },
    { category: "Cloud & Infrastructure", items: "AWS (ECS, S3, Lambda, EventBridge, ElastiCache), Kubernetes, Docker, Terraform" },
    { category: "Databases & Data Platforms", items: "MongoDB, PostgreSQL, Sybase, Redis, Snowflake, SQL, Amazon Aurora" },
    { category: "Authentication & Authorization", items: "PingFederate, JWT, Kong" },
  ];

  const handleCopyResume = () => {
    const text = `
PRATEEKA BHAT
Bengaluru, India | +91 9481345595 | prateekabhat22@gmail.com | https://www.linkedin.com/in/prateeka-bhat-8944ab148/

SUMMARY
Software Engineer with 5 years of experience designing and building scalable backend systems, microservices, and cloud native platforms using Java, Python, PostgreSQL, AWS, and Kubernetes. Skilled in developing GenAI-driven platforms, encompassing prompt engineering, agentic workflows, and MCP servers, with proficiency in AI tools such as GitHub Copilot and Claude Code. Experienced across the Agile/DevOps lifecycle, utilizing tools such as Jira and GitLab.

TECHNICAL SKILLS
${technicalSkillsList.map((s) => `${s.category}: ${s.items}`).join('\n')}

PROFESSIONAL EXPERIENCE
${CAREER_TIMELINE.map(
  (c) => `Goldman Sachs, ${c.role} (${c.period}, ${c.location})
${c.highlights.map((h) => `• ${h}`).join('\n')}
`
).join('\n')}

EDUCATION
Bachelor of Engineering in Information Science (GPA: 9.34/10) | 08/2017 – 08/2021, Bengaluru
BMS College of Engineering
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadResume = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        unit: 'pt',
        format: 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 36; // 0.5 inch margins
      const contentWidth = pageWidth - margin * 2;
      let y = 40;

      const addSectionHeader = (title: string) => {
        doc.setFont('times', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), margin, y);
        y += 3;
        doc.setLineWidth(0.75);
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, y, margin + contentWidth, y);
        y += 11;
      };

      // Header Name
      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.text('Prateeka Bhat', pageWidth / 2, y, { align: 'center' });
      y += 16;

      // Contact Line with interactive hyperlinks
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
      doc.setFontSize(9.5);
      technicalSkillsList.forEach((s) => {
        doc.setFont('times', 'bold');
        const catText = `${s.category}: `;
        doc.text(catText, margin, y);
        const catWidth = doc.getTextWidth(catText);
        doc.setFont('times', 'normal');
        const valLines = doc.splitTextToSize(s.items, contentWidth - catWidth);
        doc.text(valLines, margin + catWidth, y);
        y += valLines.length * 10.5;
      });
      y += 6;

      // PROFESSIONAL EXPERIENCE
      addSectionHeader('PROFESSIONAL EXPERIENCE');

      CAREER_TIMELINE.forEach((exp) => {
        doc.setFont('times', 'bold');
        doc.setFontSize(9.5);
        doc.text(`Goldman Sachs, `, margin, y);
        const compW = doc.getTextWidth(`Goldman Sachs, `);

        doc.setFont('times', 'italic');
        doc.text(exp.role, margin + compW, y);

        doc.setFont('times', 'normal');
        doc.setFontSize(9.5);
        doc.text(`${exp.period}, ${exp.location}`, margin + contentWidth, y, { align: 'right' });
        y += 11;

        doc.setFont('times', 'normal');
        exp.highlights.forEach((bullet) => {
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

      // Trigger download using Blob URL for maximum reliability across browsers and iframes
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Prateeka_Bhat_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch (err) {
      console.error('Error generating PDF resume:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="pb-32 px-4 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Action Header */}
      <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#201f1f] border border-[#353534] p-6 rounded-2xl">
        <div>
          <h1 className="text-[28px] font-bold text-[#e5e2e1]">Prateeka Bhat</h1>
          <p className="text-[13px] text-[#c8c6c5] mt-0.5">Software Engineer • Goldman Sachs</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyResume}
            className="px-4 py-2 rounded-full border border-[#353534] hover:border-white text-[#e5e2e1] text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied Plaintext!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadResume}
            disabled={isGeneratingPdf}
            className="px-4 py-2 rounded-full bg-[#1db954] text-[#002108] hover:bg-[#53e076] text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isGeneratingPdf ? 'hourglass_empty' : 'download'}
            </span>
            <span>{isGeneratingPdf ? 'Preparing PDF...' : 'Download Resume'}</span>
          </button>
        </div>
      </div>

      {/* Styled Resume Paper Document */}
      <div className="printable-resume bg-[#181818] border border-[#353534] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl space-y-8 text-[#e5e2e1]">
        {/* Document Header */}
        <div className="border-b border-[#353534] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-[32px] font-extrabold tracking-tight text-white">{PROFILE_INFO.name}</h2>
            <p className="text-[14px] text-[#c8c6c5] mt-1 font-medium">
              Bengaluru, India | +91 9481345595 |{' '}
              <a href={`mailto:${PROFILE_INFO.email}`} className="text-[#1db954] hover:underline">
                {PROFILE_INFO.email}
              </a>{' '}
              |{' '}
              <a href="https://www.linkedin.com/in/prateeka-bhat-8944ab148/" target="_blank" rel="noreferrer" className="text-[#1db954] hover:underline">
                linkedin.com/in/prateeka-bhat-8944ab148/
              </a>
            </p>
          </div>
        </div>

        {/* Summary */}
        <section className="space-y-3">
          <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#1db954] border-b border-[#353534] pb-1">
            Summary
          </h3>
          <p className="text-[14px] leading-relaxed text-[#c8c6c5]">
            Software Engineer with 5 years of experience designing and building scalable backend systems, microservices, and cloud native platforms using Java, Python, PostgreSQL, AWS, and Kubernetes. Skilled in developing GenAI-driven platforms, encompassing prompt engineering, agentic workflows, and MCP servers, with proficiency in AI tools such as GitHub Copilot and Claude Code. Experienced across the Agile/DevOps lifecycle, utilizing tools such as Jira and GitLab.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#1db954] border-b border-[#353534] pb-1">
            Technical Skills
          </h3>
          <div className="space-y-2 text-[13.5px]">
            {technicalSkillsList.map((skill, idx) => (
              <p key={idx} className="text-[#c8c6c5]">
                <strong className="text-white font-semibold">{skill.category}: </strong>
                {skill.items}
              </p>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-6">
          <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#1db954] border-b border-[#353534] pb-1">
            Professional Experience
          </h3>

          {CAREER_TIMELINE.map((exp) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <h4 className="text-[16px] font-bold text-white">
                  Goldman Sachs, <span className="italic font-semibold text-[#e5e2e1]">{exp.role}</span>
                </h4>
                <span className="text-[13px] font-medium text-[#c8c6c5]">
                  {exp.period}, {exp.location}
                </span>
              </div>

              <ul className="list-disc list-outside ml-5 space-y-1.5 text-[13.5px] text-[#c8c6c5] pt-1">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="space-y-3">
          <h3 className="text-[15px] font-bold uppercase tracking-wider text-[#1db954] border-b border-[#353534] pb-1">
            Education
          </h3>

          <div className="space-y-1 text-[14px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h4 className="font-bold text-white">
                Bachelor of Engineering in Information Science <span className="text-[#c8c6c5] font-normal">(GPA: 9.34/10)</span>
              </h4>
              <span className="text-[13px] text-[#c8c6c5]">08/2017 – 08/2021, Bengaluru</span>
            </div>
            <p className="text-[13.5px] text-[#c8c6c5] italic">BMS College of Engineering</p>
          </div>
        </section>
      </div>
    </div>
  );
};

