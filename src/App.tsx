import React, { useState } from 'react';
import { TabType, Project, AudioTrack, Playlist } from './types';
import {
  PROFILE_INFO,
  PROJECTS_DATA,
  DEFAULT_PLAYLISTS,
} from './data/portfolioData';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { TechToolsView } from './components/views/TechToolsView';
import { ResumeView } from './components/views/ResumeView';

import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { ContactModal } from './components/modals/ContactModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [customPlaylists, setCustomPlaylists] = useState<Playlist[]>(DEFAULT_PLAYLISTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFollowing, setIsFollowing] = useState<boolean>(true);

  const isPlaying = false;

  // Modals & Navigation
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const likedCount = projects.filter((p) => p.isLiked).length;

  const handlePlayTrack = (_track: AudioTrack) => {};

  const handleToggleLike = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isLiked: !p.isLiked } : p))
    );
  };

  const handleCreatePlaylist = (newPlaylist: Playlist) => {
    setCustomPlaylists((prev) => [...prev, newPlaylist]);
  };

  return (
    <div className="flex h-screen bg-[#121212] text-[#e5e2e1] font-sans overflow-hidden select-none">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        likedCount={likedCount}
        activePlaylistId={activePlaylistId}
        setActivePlaylistId={setActivePlaylistId}
        playlists={customPlaylists}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121212] relative md:ml-[240px]">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggleMobileSidebar={() => {}}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* Dynamic View Scroll Container */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {activeTab === 'All' && (
            <HomeView
              projects={projects}
              onSelectProject={(p) => setSelectedProjectModal(p)}
              onPlayTrack={handlePlayTrack}
              isPlaying={isPlaying}
              isFollowing={isFollowing}
              onToggleFollow={() => setIsFollowing(!isFollowing)}
              onSelectTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'Projects' && (
            <ProjectsView
              projects={projects}
              onSelectProject={(p) => setSelectedProjectModal(p)}
              onPlayTrack={handlePlayTrack}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'Tech & Tools' && (
            <TechToolsView onPlayTrack={handlePlayTrack} isPlaying={isPlaying} />
          )}

          {activeTab === 'Resume' && (
            <ResumeView />
          )}
        </main>

        {/* Visual-only Spotify-style player */}
        <footer className="fixed bottom-0 left-0 z-50 w-full h-24 bg-[#131313] border-t border-[#3d4a3d]/40 shadow-2xl flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3.5 w-1/3 min-w-[200px]">
            <img src={PROFILE_INFO.coverArtUrl} alt="Portfolio cover" className="w-14 h-14 rounded-md object-cover bg-[#353534]" />
            <div className="overflow-hidden">
              <p className="font-bold text-[13px] text-[#e5e2e1] truncate leading-tight">Prateeka Bhat</p>
              <p className="text-[11px] text-[#c8c6c5] truncate">Portfolio</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3 max-w-[420px]">
            <div className="flex items-center gap-6">
              <button disabled title="Previous track disabled" className="text-[#777] cursor-default opacity-70">
                <span className="material-symbols-outlined text-[24px] material-symbols-filled">skip_previous</span>
              </button>
              <button disabled title="Playback disabled" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black shadow-md cursor-default opacity-90">
                <span className="material-symbols-outlined text-[26px] material-symbols-filled">play_arrow</span>
              </button>
              <button disabled title="Next track disabled" className="text-[#777] cursor-default opacity-70">
                <span className="material-symbols-outlined text-[24px] material-symbols-filled">skip_next</span>
              </button>
            </div>
            <div className="w-full flex items-center gap-2 mt-1">
              <span className="text-[#c8c6c5] text-[11px]">0:00</span>
              <input type="range" min={0} max={100} value={36} disabled aria-label="Playback progress (disabled)" className="flex-1 h-1 appearance-none rounded-full bg-[#353534] cursor-default accent-[#1db954] pointer-events-none" />
              <span className="text-[#c8c6c5] text-[11px]">4:02</span>
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 w-1/3 min-w-[150px] text-[#c8c6c5]">
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
            <input type="range" min={0} max={100} value={75} disabled aria-label="Volume (disabled)" className="w-20 h-1 appearance-none rounded-full bg-[#353534] cursor-default accent-[#1db954] pointer-events-none" />
          </div>
        </footer>

      </div>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
        onPlayTrack={handlePlayTrack}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
