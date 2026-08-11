import React, { useState } from 'react';
import { Project } from '../../types';
import { PROFILE_INFO } from '../../data/portfolioData';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onToggleLike: (projectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onToggleLike,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="pb-32 px-4 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Public Playlist Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 bg-gradient-to-b from-[#2a2a2a]/60 to-[#181818]/40 p-6 md:p-8 rounded-2xl border border-[#353534]/50">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-2xl shrink-0 bg-[#201f1f] border-2 border-[#353534] relative group">
          <img
            src={PROFILE_INFO.heroBgUrl}
            alt="Web Apps Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white text-[48px]">terminal</span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <h1 className="text-[32px] md:text-[52px] font-black text-[#e5e2e1] leading-tight">
            Web Apps & Systems
          </h1>
          <p className="text-[14px] text-[#c8c6c5] max-w-2xl">
            A curated collection of personal projects.
          </p>
          <div className="flex items-center gap-2 text-[13px] text-[#c8c6c5] pt-2">
            <img
              src={PROFILE_INFO.avatarUrl}
              alt="Prateeka Bhat"
              className="w-6 h-6 rounded-full object-cover border border-[#1db954]"
            />
            <span className="font-bold text-white">{PROFILE_INFO.name}</span>
            <span>• {projects.length} Projects</span>
            <span>• Updated 2026</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative w-full sm:w-[280px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c8c6c5] text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#201f1f] border border-[#353534] rounded-full pl-10 pr-4 py-2 text-[13px] text-[#e5e2e1] placeholder-[#c8c6c5] focus:outline-none focus:border-[#1db954] transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid View */}
      <div>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#181818] rounded-xl border border-[#353534]">
            <span className="material-symbols-outlined text-[48px] text-[#c8c6c5] mb-2">
              folder_off
            </span>
            <p className="text-[#c8c6c5]">No projects matched your filter query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#181818] hover:bg-[#282828] p-5 rounded-xl transition-all duration-300 group cursor-pointer border border-[#353534]/50 hover:-translate-y-1 shadow-xl flex flex-col justify-between relative"
              >
                <div>
                  {/* Image Container with Play Overlay */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 bg-[#2a2a2a]"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute right-3 bottom-3 w-12 h-12 rounded-full bg-[#1db954] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:scale-105">
                      <span className="material-symbols-outlined text-[28px] material-symbols-filled">
                        play_arrow
                      </span>
                    </div>
                  </div>

                  {/* Header & Title */}
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-bold text-[17px] text-[#e5e2e1] hover:text-[#1db954] transition-colors truncate"
                    >
                      {project.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(project.id);
                      }}
                      className="text-[#c8c6c5] hover:text-[#1db954] transition-colors p-1"
                      title="Like Project"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          project.isLiked ? 'text-[#1db954] material-symbols-filled' : ''
                        }`}
                      >
                        {project.isLiked ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>

                  <p className="text-[12px] text-[#1db954] font-medium mb-2">
                    {project.subtitle}
                  </p>

                  <p className="text-[13px] text-[#c8c6c5] line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Details */}
                <div className="pt-3 border-t border-[#353534]/50 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-[#131313] text-[#c8c6c5] px-2 py-0.5 rounded border border-[#353534]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#c8c6c5] pt-1">
                    <span>Duration: {project.duration}</span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-[#1db954] font-bold hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
