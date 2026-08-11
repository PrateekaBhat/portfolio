import React from 'react';
import { Project } from '../../types';
import { PROFILE_INFO, WRITING_DATA, CAREER_TIMELINE } from '../../data/portfolioData';

interface HomeViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onSelectTab: (tab: any) => void;
  onSelectExperience: (id: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onSelectProject,
  onSelectTab,
  onSelectExperience,
}) => {
  return (
    <div className="pb-32">
      {/* Hero Section (Artist Banner) */}
      <section className="relative w-full h-[360px] md:h-[460px] bg-[#1c1b1b] flex items-end pb-8">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat absolute inset-0 opacity-60"
            style={{ backgroundImage: `url("${PROFILE_INFO.heroBgUrl}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 md:px-8 flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#1db954] mb-2">
              <span className="text-[12px] font-bold tracking-widest uppercase">
                Software Engineer
              </span>
            </div>
            <h1 className="text-[38px] md:text-[60px] lg:text-[72px] font-black text-[#e5e2e1] mb-2 leading-tight tracking-tight drop-shadow-xl">
              {PROFILE_INFO.name}
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#c8c6c5] max-w-2xl font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{PROFILE_INFO.role}</span>
              <span>•</span>
              <span>{PROFILE_INFO.location}</span>
              <span>•</span>
              <span className="text-[#1db954] font-semibold">{PROFILE_INFO.version}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="px-4 md:px-8 py-5 flex items-center gap-5 bg-[#131313]/90 backdrop-blur-md border-b border-[#353534]/40">
        <button
          disabled
          className="w-14 h-14 rounded-full bg-[#1db954] flex items-center justify-center text-black shadow-lg shadow-[#1db954]/30 cursor-default opacity-90"
          title="About"
        >
          <span className="material-symbols-outlined text-[32px] material-symbols-filled">
            play_arrow
          </span>
        </button>

        <button
          disabled
          className="px-6 py-2 rounded-full border text-[13px] font-bold uppercase tracking-widest bg-[#1db954] border-[#1db954] text-[#002108] cursor-default"
        >
          Following
        </button>
      </div>

      {/* Main Content Area */}
      <div className="px-4 md:px-8 py-8 space-y-12">
        {/* About Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-bold text-[#e5e2e1]">About</h2>
            <button
              onClick={() => onSelectTab('Career')}
              className="text-[#c8c6c5] hover:text-[#1db954] text-[13px] font-bold uppercase tracking-wider transition-colors"
            >
              View Career →
            </button>
          </div>

          <div className="bg-[#201f1f]/60 border border-[#353534] rounded-2xl p-6 md:p-8 hover:bg-[#201f1f] transition-all max-w-4xl group shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden shrink-0 shadow-2xl group-hover:shadow-[0_8px_24px_rgba(29,185,84,0.2)] group-hover:-translate-y-1 transition-all duration-300 border-2 border-[#353534]">
                <img
                  src={PROFILE_INFO.avatarUrl}
                  alt="Developer Portrait"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                {PROFILE_INFO.aboutDetailed
                  .split(/\r?\n\r?\n/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] md:text-[16px] text-[#c8c6c5] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </section>


        {/* Experience Section */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-[24px] font-bold text-[#e5e2e1]">Professional Journey</h2>
          </div>

          <div className="bg-[#201f1f]/60 border border-[#353534] rounded-2xl overflow-hidden max-w-4xl shadow-lg">
            {CAREER_TIMELINE.slice(0, 2).map((track, index) => (
              <div
                key={track.id}
                onClick={() => onSelectExperience(track.id)}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-[#282828] transition-colors cursor-pointer group ${
                  index !== 0 ? 'border-t border-[#353534]/60' : ''
                }`}
              >
                <span className="text-[#7a7876] text-[13px] font-medium w-5 text-center shrink-0 group-hover:hidden">
                  {index + 1}
                </span>
                <span className="hidden group-hover:flex text-[#1db954] w-5 items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] material-symbols-filled">play_arrow</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-[#e5e2e1] truncate">{track.role}</p>
                  <p className="text-[13px] text-[#c8c6c5] truncate">{track.company} • {track.location}</p>
                </div>
                <div className="text-[13px] text-[#c8c6c5] shrink-0">{track.period}</div>
              </div>
            ))}
          </div>
        </section>



        {/* Featured Projects / Web Apps Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-bold text-[#e5e2e1]">Featured Projects</h2>
            <button
              onClick={() => onSelectTab('Projects')}
              className="text-[#c8c6c5] hover:text-[#1db954] text-[12px] font-bold uppercase tracking-wider"
            >
              SHOW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-[#181818] hover:bg-[#282828] p-4 rounded-xl transition-all duration-300 group cursor-pointer border border-[#353534]/40 hover:-translate-y-1 shadow-lg relative"
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 bg-[#2a2a2a]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Play Button */}
                  <div className="absolute right-3 bottom-3 w-12 h-12 rounded-full bg-[#1db954] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105">
                    <span className="material-symbols-outlined text-[28px] material-symbols-filled">
                      play_arrow
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-[16px] text-[#e5e2e1] mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[#c8c6c5] line-clamp-2 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-[#131313] text-[#c8c6c5] px-2 py-0.5 rounded border border-[#353534]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-bold text-[#e5e2e1]">Blog</h2>
          </div>

          <div className="grid grid-cols-1 max-w-4xl gap-6">
            {WRITING_DATA.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="bg-[#201f1f]/50 hover:bg-[#201f1f] border border-[#353534] p-5 rounded-xl flex items-center gap-5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#131313] border border-[#353534] shrink-0 flex items-center justify-center group-hover:border-[#1db954] transition-colors">
                  <span className="material-symbols-outlined text-[22px] text-[#c8c6c5] group-hover:text-[#1db954] transition-colors">
                    article
                  </span>
                </div>

                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-[15px] text-[#e5e2e1] group-hover:text-[#1db954] transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-[13px] text-[#c8c6c5] line-clamp-2 mt-0.5">
                    {post.excerpt}
                  </p>
                  <span className="text-[11px] text-[#1db954] font-medium mt-2 block">
                    {post.source} • {post.readTime}
                  </span>
                </div>

                <span className="material-symbols-outlined text-[18px] text-[#c8c6c5] group-hover:text-[#1db954] transition-colors shrink-0">
                  open_in_new
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
