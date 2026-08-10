import React from 'react';
import { Project, AudioTrack } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onPlayTrack: (track: AudioTrack) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onPlayTrack,
}) => {
  if (!project) return null;

  const projectTrack: AudioTrack = {
    id: `track-${project.id}`,
    title: `${project.title} - Overview`,
    artist: "Prateeka Bhat",
    album: "Web Apps Playlist",
    coverUrl: project.imageUrl,
    duration: 180,
    audioText: project.audioText,
    type: "project",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#181818] border border-[#353534] rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c8c6c5] hover:text-white text-[24px] cursor-pointer"
        >
          ×
        </button>

        {/* Hero Cover */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#2a2a2a] border border-[#353534]">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div>
          <span className="text-[12px] font-bold text-[#1db954] uppercase tracking-wider">
            PROJECT OVERVIEW
          </span>
          <h2 className="text-[28px] font-bold text-white mt-1">{project.title}</h2>
          <p className="text-[14px] font-semibold text-[#1db954] mb-3">{project.subtitle}</p>
          <p className="text-[14.5px] text-[#c8c6c5] leading-relaxed">{project.fullDescription}</p>
        </div>

        <div className="flex gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-full border border-[#c8c6c5] hover:border-white text-white font-bold text-[13px] text-center transition-all">
              GitHub Repository
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-full bg-[#1db954] text-[#002108] font-bold text-[13px] text-center transition-all hover:scale-105">
              Demo
            </a>
          )}
        </div>

        {/* Architecture Highlights */}
        <div>
          <h4 className="text-[14px] font-bold text-white uppercase tracking-wider mb-2">
            Architecture & Key Innovations
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-[13.5px] text-[#c8c6c5]">
            {project.architectureHighlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div>
          <h4 className="text-[12px] font-bold text-[#c8c6c5] uppercase tracking-wider mb-2">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#201f1f] text-[#e5e2e1] text-[12px] font-bold rounded-lg border border-[#353534]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
