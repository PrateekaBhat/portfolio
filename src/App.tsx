import React, { useState, useEffect, useRef } from 'react';
import { TabType, Project, AudioTrack, Playlist } from './types';
import {
  PROFILE_INFO,
  PROJECTS_DATA,
  DEFAULT_PLAYLISTS,
  DEFAULT_AUDIO_TRACKS,
} from './data/portfolioData';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { PlayerBar } from './components/PlayerBar';

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

  // Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(DEFAULT_AUDIO_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(DEFAULT_AUDIO_TRACKS[0].duration);
  const [volume, setVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals & Navigation
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const likedCount = projects.filter((p) => p.isLiked).length;

  // Speech Synthesis ref
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Handle Play/Pause and Text-to-Speech audio narration
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlaying && currentTrack) {
        const textToSpeak = `${currentTrack.title}. ${currentTrack.artist}. ${currentTrack.audioText}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          setIsPlaying(false);
          setCurrentTime(0);
        };

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [currentTrack, isPlaying]);

  // Audio timer ticker
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const handlePlayTrack = (track: AudioTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      if (isPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      } else if (!isPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
    } else {
      setCurrentTrack(track);
      setDuration(track.duration);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleToggleLike = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isLiked: !p.isLiked } : p))
    );
  };

  const handleCreatePlaylist = (newPlaylist: Playlist) => {
    setCustomPlaylists((prev) => [...prev, newPlaylist]);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = DEFAULT_AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % DEFAULT_AUDIO_TRACKS.length;
    handlePlayTrack(DEFAULT_AUDIO_TRACKS[nextIndex]);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = DEFAULT_AUDIO_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + DEFAULT_AUDIO_TRACKS.length) % DEFAULT_AUDIO_TRACKS.length;
    handlePlayTrack(DEFAULT_AUDIO_TRACKS[prevIndex]);
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

        {/* Bottom Persistent Player Bar */}
        <PlayerBar
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          onPlayPause={() => {
            if (currentTrack) handlePlayTrack(currentTrack);
          }}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onSeek={(time) => setCurrentTime(time)}
          onVolumeChange={(vol) => setVolume(vol)}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
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
