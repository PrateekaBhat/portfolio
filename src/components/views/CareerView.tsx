import React, { useEffect, useRef, useState } from 'react';
import { CAREER_TIMELINE, EDUCATION_DATA } from '../../data/portfolioData';

interface CareerViewProps {
  initialExpandedId?: number | null;
  onConsumeInitialExpandedId?: () => void;
}

export const CareerView: React.FC<CareerViewProps> = ({
  initialExpandedId,
  onConsumeInitialExpandedId,
}) => {
  // Initialize directly from the prop (when navigating here for a specific
  // role) so there's no flash of the default (first) entry before switching.
  const [expandedId, setExpandedId] = useState<number | null>(
    initialExpandedId ?? CAREER_TIMELINE[0]?.id ?? null
  );
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // If the user navigated here targeting a specific role (e.g. from the
  // About page), expand that role and scroll it into view instead of
  // defaulting to the first entry. Also handles the case where CareerView
  // is already mounted and a new target id comes in.
  useEffect(() => {
    if (initialExpandedId != null) {
      setExpandedId(initialExpandedId);

      const scrollToTarget = () => {
        const node = itemRefs.current[initialExpandedId];
        if (node) {
          node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Wait for the browser to finish laying out the (now-expanded) card
      // and any images inside it before measuring where to scroll — doing
      // this immediately can compute the target against stale layout and
      // overshoot past the card.
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
      // Correct once more shortly after, in case a logo image finishes
      // loading late and shifts layout after the first scroll.
      const fallbackTimer = window.setTimeout(scrollToTarget, 350);

      onConsumeInitialExpandedId?.();

      return () => window.clearTimeout(fallbackTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialExpandedId]);

  const toggleExpanded = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pb-32 px-4 md:px-8 py-6 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#201f1f] border border-[#353534] p-6 rounded-2xl">
        <h1 className="text-[28px] md:text-[36px] font-black text-[#e5e2e1]">Career</h1>
        <p className="text-[13px] text-[#c8c6c5] mt-1">
          My professional journey, work experience, and educational background.
        </p>
      </div>

      {/* Work Experience */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#e5e2e1]">
          <span className="material-symbols-outlined text-[20px] text-[#1db954]">work</span>
          Work Experience
        </h2>

        <div className="space-y-4">
          {CAREER_TIMELINE.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                ref={(node) => { itemRefs.current[exp.id] = node; }}
                className="bg-[#181818] border border-[#353534]/60 rounded-2xl p-5 md:p-6 transition-all shadow-lg scroll-mt-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#131313] border border-[#353534] flex items-center justify-center shrink-0 overflow-hidden">
                    {exp.logoUrl ? (
                      <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <span className="material-symbols-outlined text-[22px] text-[#1db954]">business_center</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[17px] md:text-[18px] font-bold text-white leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-[13.5px] text-[#c8c6c5] mt-0.5">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-[12.5px] text-[#7a7876] mt-1 flex flex-wrap items-center gap-x-1.5">
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.duration}</span>
                      <span>•</span>
                      <span>{exp.employmentType}</span>
                    </p>

                    <button
                      onClick={() => toggleExpanded(exp.id)}
                      className="mt-3 flex items-center gap-1 text-[12.5px] font-semibold text-[#1db954] hover:text-[#53e076] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                      {isExpanded ? 'Hide details' : 'Show details'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-[#353534]/60 space-y-5 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-[11.5px] font-bold text-[#1db954] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">checklist</span>
                        Responsibilities
                      </h4>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex gap-2 text-[13px] text-[#c8c6c5] leading-relaxed">
                            <span className="text-[#1db954] shrink-0">✓</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <h4 className="text-[11.5px] font-bold text-[#1db954] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                          What I Learned
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.whatILearned.map((w, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-[#c8c6c5] leading-relaxed">
                              <span className="text-[#1db954] shrink-0">✓</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[11.5px] font-bold text-[#1db954] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                          Impact
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.impact.map((im, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-[#c8c6c5] leading-relaxed">
                              <span className="text-[#1db954] shrink-0">✓</span>
                              <span>{im}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto space-y-4">
        <h2 className="flex items-center gap-2 text-[18px] font-bold text-[#e5e2e1]">
          <span className="material-symbols-outlined text-[20px] text-[#1db954]">school</span>
          Education
        </h2>

        <div className="space-y-4">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="bg-[#181818] border border-[#353534]/60 rounded-2xl p-5 md:p-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#131313] border border-[#353534] flex items-center justify-center shrink-0 overflow-hidden">
                  {edu.logoUrl ? (
                    <img src={edu.logoUrl} alt={edu.institution} className="w-full h-full object-contain p-1.5" />
                  ) : (
                    <span className="material-symbols-outlined text-[22px] text-[#1db954]">school</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[16px] md:text-[17px] font-bold text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-[13.5px] text-[#c8c6c5] mt-0.5">
                    {edu.institution} • {edu.location}
                  </p>
                  <p className="text-[12.5px] text-[#7a7876] mt-1 flex flex-wrap items-center gap-x-1.5">
                    <span>{edu.period}</span>
                    {edu.gpa && (
                      <>
                        <span>•</span>
                        <span>GPA: {edu.gpa}</span>
                      </>
                    )}
                  </p>

                  {edu.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-[13px] text-[#c8c6c5] leading-relaxed">
                          <span className="text-[#1db954] shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
