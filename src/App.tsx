import React, { useEffect, useRef, useState } from 'react';
import { TabType, Project } from './types';
import {
  PROFILE_INFO,
  PROJECTS_DATA,
} from './data/portfolioData';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';

import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { TechToolsView } from './components/views/TechToolsView';
import { CareerView } from './components/views/CareerView';

import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { ContactModal } from './components/modals/ContactModal';
import { AboutSiteModal } from './components/modals/AboutSiteModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals & Navigation
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isAboutSiteModalOpen, setIsAboutSiteModalOpen] = useState<boolean>(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);
  const mainScrollRef = useRef<HTMLElement | null>(null);

  // Reset scroll position whenever the active tab changes, so switching
  // tabs (e.g. via "View Career") always opens at the top of the new page
  // instead of inheriting scroll position left over from a previous visit.
  // When a specific experience is targeted (selectedExperienceId is set),
  // skip this — CareerView's own effect handles scrolling to that card.
  useEffect(() => {
    if (selectedExperienceId == null && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleToggleLike = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isLiked: !p.isLiked } : p))
    );
  };

  return (
    <div className="flex h-dvh bg-[#121212] text-[#e5e2e1] font-sans overflow-hidden select-none">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121212] relative md:ml-[240px]">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* Dynamic View Scroll Container */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {activeTab === 'All' && (
            <HomeView
              projects={projects}
              onSelectProject={(p) => setSelectedProjectModal(p)}
              onSelectTab={(tab) => setActiveTab(tab)}
              onSelectExperience={(id) => {
                setSelectedExperienceId(id);
                setActiveTab('Career');
              }}
            />
          )}

          {activeTab === 'Projects' && (
            <ProjectsView
              projects={projects}
              onSelectProject={(p) => setSelectedProjectModal(p)}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'Tech & Tools' && (
            <TechToolsView />
          )}

          {activeTab === 'Career' && (
            <CareerView
              initialExpandedId={selectedExperienceId}
              onConsumeInitialExpandedId={() => setSelectedExperienceId(null)}
            />
          )}
        </main>

        {/* Visual-only Spotify-style player */}
        <footer className="fixed bottom-0 left-0 z-50 w-full min-h-[64px] md:h-24 bg-[#131313] border-t border-[#3d4a3d]/40 shadow-2xl flex items-center justify-between gap-2 px-3 py-2 md:px-6 md:py-0">
          <div className="flex items-center gap-2.5 md:gap-3.5 w-1/2 md:w-1/3 min-w-0 md:min-w-[200px]">
            <img src={PROFILE_INFO.coverArtUrl} alt="Portfolio cover" className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover bg-[#353534] shrink-0" />
            <div className="overflow-hidden min-w-0">
              <p className="font-bold text-[12px] md:text-[13px] text-[#e5e2e1] truncate leading-tight">Prateeka Bhat</p>
              <p className="text-[10px] md:text-[11px] text-[#c8c6c5] truncate">Portfolio</p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center w-1/3 max-w-[420px]">
            <div className="flex items-center gap-6">
              <button disabled title="Shuffle disabled" className="text-[#666564] cursor-default opacity-70 hidden sm:block">
                <span className="material-symbols-outlined text-[18px]">shuffle</span>
              </button>
              <button disabled title="Previous track disabled" className="text-[#777] cursor-default opacity-70">
                <span className="material-symbols-outlined text-[24px] material-symbols-filled">skip_previous</span>
              </button>
              <button
                onClick={() => setIsAboutSiteModalOpen(true)}
                title="Play"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#f0f0f0] flex items-center justify-center text-black shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-[26px] material-symbols-filled">play_arrow</span>
              </button>
              <button disabled title="Next track disabled" className="text-[#777] cursor-default opacity-70">
                <span className="material-symbols-outlined text-[24px] material-symbols-filled">skip_next</span>
              </button>
              <button disabled title="Repeat disabled" className="text-[#666564] cursor-default opacity-70 hidden sm:block">
                <span className="material-symbols-outlined text-[18px]">repeat</span>
              </button>
            </div>
            <div className="w-full flex items-center gap-2 mt-1">
              <span className="text-[#c8c6c5] text-[11px]">1:00</span>
              <input type="range" min={0} max={100} value={25} disabled aria-label="Playback progress (disabled)" className="flex-1 h-1 appearance-none rounded-full bg-[#353534] cursor-default accent-[#1db954] pointer-events-none" />
              <span className="text-[#c8c6c5] text-[11px]">4:02</span>
            </div>
          </div>

          {/* Mobile-only compact play control — wrapped so it centers in the
              remaining space instead of getting pushed to the far right by
              justify-between once the desktop-only side sections are hidden */}
          <div className="flex md:hidden flex-1 items-center justify-center">
            <button
              onClick={() => setIsAboutSiteModalOpen(true)}
              title="Play"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#f0f0f0] flex items-center justify-center text-black shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-[22px] material-symbols-filled">play_arrow</span>
            </button>
          </div>

          <div className="hidden md:flex justify-end items-center gap-2 w-1/3 min-w-[150px] text-[#c8c6c5]">
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
            <input type="range" min={0} max={100} value={75} disabled aria-label="Volume (disabled)" className="w-20 h-1 appearance-none rounded-full bg-[#353534] cursor-default accent-[#1db954] pointer-events-none" />
          </div>
        </footer>

      </div>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <AboutSiteModal
        isOpen={isAboutSiteModalOpen}
        onClose={() => setIsAboutSiteModalOpen(false)}
      />
    </div>
  );
}
