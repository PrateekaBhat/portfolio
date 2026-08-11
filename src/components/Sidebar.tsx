import React from 'react';
import { TabType } from '../types';
import { PROFILE_INFO } from '../data/portfolioData';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onCloseMobile}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <nav
        className={`fixed left-0 top-0 h-full w-[240px] bg-[#131313] flex flex-col gap-y-4 py-6 z-50 border-r border-[#353534] transition-transform duration-300 ease-out
        md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="md:hidden absolute top-4 right-4 text-[#c8c6c5] hover:text-white p-1.5 rounded-full hover:bg-[#201f1f]"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
      {/* Curator Header */}
      <div className="px-6 mb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#353534] overflow-hidden shrink-0 border border-[#474746]">
          <img
            src={PROFILE_INFO.avatarUrl}
            alt="Prateeka Bhat Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <h1 className="font-bold text-[16px] text-[#e5e2e1] leading-tight truncate">
            {PROFILE_INFO.name}
          </h1>
          <p className="text-[#c8c6c5] text-[12px] flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#1db954] inline-block shrink-0"></span>
            <span>{PROFILE_INFO.version}</span>
          </p>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        <button
          onClick={() => {
            setActiveTab('All');
            onCloseMobile?.();
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'All'
              ? 'text-[#e5e2e1] border-l-4 border-[#1db954] font-bold bg-[#353534]/40'
              : 'text-[#c8c6c5] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] text-[#1db954]">home</span>
          <span className="text-[14px] font-medium">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('Projects');
            onCloseMobile?.();
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'Projects'
              ? 'text-[#e5e2e1] border-l-4 border-[#1db954] font-bold bg-[#353534]/40'
              : 'text-[#c8c6c5] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">library_music</span>
          <span className="text-[14px] font-medium">Your Library</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('Tech & Tools');
            onCloseMobile?.();
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'Tech & Tools'
              ? 'text-[#e5e2e1] border-l-4 border-[#1db954] font-bold bg-[#353534]/40'
              : 'text-[#c8c6c5] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">playlist_add_check</span>
          <span className="text-[14px] font-medium font-sans">Playlists</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('Career');
            onCloseMobile?.();
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'Career'
              ? 'text-[#e5e2e1] border-l-4 border-[#1db954] font-bold bg-[#353534]/40'
              : 'text-[#c8c6c5] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">work</span>
          <span className="text-[14px] font-medium">Career</span>
        </button>
      </div>

      <div className="px-6 pt-4 pb-2 mb-24 border-t border-[#353534]">
        <div className="flex items-center justify-between text-[#c8c6c5]">
          <a href={PROFILE_INFO.linkedIn} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn" className="hover:text-[#1db954] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.4 8h4.2v15H.4V8zM7.2 8h4v2.05h.06c.56-1.05 1.92-2.16 3.95-2.16 4.22 0 5 2.78 5 6.39V23H16v-7.65c0-1.82-.03-4.16-2.53-4.16-2.54 0-2.93 1.98-2.93 4.03V23H6.3V8h.9z" /></svg>
          </a>
          <a href={PROFILE_INFO.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub" className="hover:text-[#1db954] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.7-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.64 5.26-5.15 5.55.4.35.76 1.04.76 2.1v3.1c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7z" /></svg>
          </a>
          <a href={PROFILE_INFO.medium} target="_blank" rel="noreferrer" title="Medium" aria-label="Medium" className="hover:text-[#1db954] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M2.01 5.5a.75.75 0 0 0-.26-.63L.25 3.05V2.5h5.06l3.91 8.58L12.66 2.5h4.83v.55l-1.28 1.23a.37.37 0 0 0-.14.35v14.74a.37.37 0 0 0 .14.35l1.25 1.23v.55h-6.3v-.55l1.3-1.26c.13-.13.13-.17.13-.36V7.42L8.98 21.47h-.49L4.28 7.42v9.53c-.04.25.04.5.21.69l1.69 2.05v.55H1.39v-.55l1.7-2.05c.17-.19.24-.44.2-.69V5.5z" /></svg>
          </a>
          <a href={`mailto:${PROFILE_INFO.email}`} title="Email" aria-label="Email" className="hover:text-[#1db954] transition-colors">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 3.24V18h18V7.24l-9 6.2-9-6.2zM4.56 6 12 11.13 19.44 6H4.56z" /></svg>
          </a>
        </div>
        <p className="mt-4 text-center text-[10px] leading-relaxed text-[#7a7876]">© Prateeka Bhat. All rights reserved.</p>
      </div>
      </nav>
    </>
  );
};
