import React, { useState } from 'react';
import { TabType } from '../types';
import { PROFILE_INFO } from '../data/portfolioData';

interface TopHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenHireMe?: () => void;
  onOpenContactModal?: () => void;
  onToggleMobileSidebar: () => void;
  historyCanGoBack?: boolean;
  historyCanGoForward?: boolean;
  onNavigateBack?: () => void;
  onNavigateForward?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenContactModal,
  onToggleMobileSidebar,
  onNavigateBack,
  onNavigateForward,
}) => {
  const tabs: TabType[] = ['All', 'Projects', 'Tech & Tools', 'Resume'];

  return (
    <header className="sticky top-0 right-0 w-full z-40 bg-[#131313]/85 backdrop-blur-xl border-b border-[#353534]/50 flex justify-between items-center px-4 md:px-8 py-3.5 transition-all">
      {/* Left: Navigation Controls & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden text-[#c8c6c5] hover:text-white p-1 rounded-lg hover:bg-[#201f1f]"
          title="Open Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

      </div>

      {/* Center Filter Pills */}
      <nav className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar max-w-[60vw] md:max-w-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1 text-[13px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md scale-105'
                  : 'bg-[#353534]/60 text-[#e5e2e1] hover:bg-[#474746] hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenContactModal}
          className="bg-[#1db954] hover:bg-[#53e076] text-[#002108] rounded-full px-3.5 py-1 text-[13px] font-bold transition-all hover:scale-105 flex items-center gap-1.5 shadow-md cursor-pointer"
          title="Contact Prateeka via Web Gmail"
        >
          <span className="material-symbols-outlined text-[16px]">mail</span>
          <span>Contact Me</span>
        </button>

        <button
          disabled
          title="Notifications disabled"
          aria-label="Notifications disabled"
          className="p-1.5 text-[#888888] cursor-default flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
        </button>

        <div
          className="p-1.5 text-[#888888] select-none cursor-default flex items-center justify-center"
          title="Settings"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </div>

        <div
          onClick={() => setActiveTab('All')}
          className="w-8 h-8 rounded-full bg-[#353534] overflow-hidden border-2 border-transparent hover:border-[#1db954] transition-colors cursor-pointer shrink-0"
          title="Profile View"
        >
          <img
            src={PROFILE_INFO.avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
