import React from 'react';
import { SkillCategory, AudioTrack } from '../../types';
import { PROFILE_INFO, TECHNICAL_SKILL_CATEGORIES } from '../../data/portfolioData';

interface TechToolsViewProps {
  onPlayTrack: (track: AudioTrack) => void;
  isPlaying: boolean;
}

export const TechToolsView: React.FC<TechToolsViewProps> = ({ onPlayTrack, isPlaying }) => {
  const techTrack: AudioTrack = {
    id: "track-techtools",
    title: "Tech & Tools Rotation",
    artist: "Prateeka Bhat",
    album: "Tech & Tools Playlist",
    coverUrl: PROFILE_INFO.avatarUrl,
    duration: 180,
    audioText: "Tech & Tools overview: Prateeka's tech stack encompasses Programming Languages, AI & LLM Technologies, AI Developer Tools, Backend Technologies, Cloud & DevOps, Databases, Frontend, API Gateway & Authentication, and Developer Tools.",
    type: "skill"
  };

  return (
    <div className="pb-32 px-4 md:px-8 py-6 space-y-10 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gradient-to-b from-[#201f1f] to-[#131313] p-6 md:p-8 rounded-2xl border border-[#353534]/50">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-xl overflow-hidden shadow-2xl shrink-0 bg-[#201f1f] border-2 border-[#353534] flex items-center justify-center bg-gradient-to-br from-[#1db954]/20 via-[#201f1f] to-[#353534]">
          <img
            src={PROFILE_INFO.avatarUrl}
            alt="Prateeka Bhat"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 flex-1">
          <span className="text-[12px] font-bold tracking-widest text-[#1db954] uppercase">
            PUBLIC PLAYLIST
          </span>
          <h1 className="text-[36px] md:text-[56px] font-black text-[#e5e2e1] leading-tight">
            Tech & Tools
          </h1>
          <p className="text-[15px] text-[#c8c6c5] max-w-2xl leading-relaxed">
            The complete collection of languages, frameworks, and tools in my current production rotation.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#c8c6c5] font-medium pt-1">
            <span className="font-bold text-white">Software Engineer</span>
            <span>• 9 Categories</span>
            <span>• 42 Technologies</span>
          </div>
        </div>
      </div>

      {/* Action Play Button */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => onPlayTrack(techTrack)}
          className="w-14 h-14 rounded-full bg-[#1db954] hover:bg-[#53e076] hover:scale-105 active:scale-95 flex items-center justify-center text-black shadow-lg shadow-[#1db954]/30 transition-all cursor-pointer"
          title="Play Tech Overview"
        >
          <span className="material-symbols-outlined text-[32px] material-symbols-filled">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <span className="text-[14px] font-bold text-[#e5e2e1]">Play Tech Stack Overview</span>
      </div>

      {/* Categorized Tech Stack Grid */}
      <section className="space-y-6">
        <h2 className="text-[24px] font-bold text-[#e5e2e1]">Tech Stack Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECHNICAL_SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#181818] border border-[#353534]/60 rounded-2xl p-6 hover:bg-[#201f1f] transition-all shadow-md"
            >
              <h3 className="font-bold text-[18px] text-[#1db954] mb-1">{cat.title}</h3>
              <p className="text-[13px] text-[#c8c6c5] mb-4 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1.5 bg-[#131313] text-[#e5e2e1] text-[13px] font-bold rounded-lg border border-[#353534] hover:border-[#1db954] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
