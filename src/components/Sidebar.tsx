import React from 'react';
import { TabType, Playlist } from '../types';
import { PROFILE_INFO } from '../data/portfolioData';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  likedCount?: number;
  onOpenCreatePlaylist?: () => void;
  activePlaylistId?: string | null;
  setActivePlaylistId?: (id: string | null) => void;
  playlists?: Playlist[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activePlaylistId = null,
  setActivePlaylistId,
}) => {
  return (
    <nav className="hidden md:flex fixed left-0 top-0 h-[calc(100%-6rem)] w-[240px] bg-[#131313] flex-col gap-y-4 py-6 z-40 border-r border-[#353534]">
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
            setActivePlaylistId?.(null);
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'All' && !activePlaylistId
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
            setActivePlaylistId?.(null);
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
            setActivePlaylistId?.(null);
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
            setActiveTab('Resume');
            setActivePlaylistId?.(null);
          }}
          className={`w-full flex items-center gap-4 py-2.5 px-3 rounded-r-md text-left transition-all ${
            activeTab === 'Resume'
              ? 'text-[#e5e2e1] border-l-4 border-[#1db954] font-bold bg-[#353534]/40'
              : 'text-[#c8c6c5] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">description</span>
          <span className="text-[14px] font-medium">Resume</span>
        </button>
      </div>
    </nav>
  );
};
