import React, { useState, useEffect, useRef } from 'react';
import { AudioTrack } from '../types';
import { PROFILE_INFO } from '../data/portfolioData';

interface PlayerBarProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectTrackById: (id: string) => void;
  isLiked?: boolean;
  onToggleLikeTrack?: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  isLiked = true,
  onToggleLikeTrack,
}) => {
  const [currentTime, setCurrentTime] = useState(134); // ~2:14
  const [duration, setDuration] = useState(currentTrack.duration || 242); // 4:02
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showLyricsOverlay, setShowLyricsOverlay] = useState(false);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync duration when track changes
  useEffect(() => {
    setDuration(currentTrack.duration || 242);
    setCurrentTime(0);

    // Speech synthesis narration when user hits play
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTrack.audioText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentTrack]);

  // Audio speech control on play/pause toggle
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.speaking) {
        const utterance = new SpeechSynthesisUtterance(currentTrack.audioText);
        utterance.rate = 1.0;
        synthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      window.speechSynthesis.pause();
    }
  }, [isPlaying]);

  // Timer interval simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            onNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, onNextTrack]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full h-24 z-50 bg-[#131313] border-t border-[#3d4a3d]/40 shadow-2xl flex justify-between items-center px-4 md:px-6">
        {/* Left Track Info */}
        <div className="flex items-center gap-3.5 w-1/3 min-w-[200px]">
          <div className="w-14 h-14 rounded-md overflow-hidden bg-[#353534] relative group shrink-0 shadow-md">
            <img
              src={currentTrack.coverUrl || PROFILE_INFO.coverArtUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowLyricsOverlay(!showLyricsOverlay)}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white cursor-pointer"
              title="Toggle Audio Script / Info"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showLyricsOverlay ? 'expand_more' : 'expand_less'}
              </span>
            </button>
          </div>

          <div className="overflow-hidden">
            <h4 className="font-bold text-[13px] text-[#e5e2e1] hover:underline cursor-pointer truncate leading-tight">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-[#c8c6c5] hover:underline cursor-pointer truncate">
              {currentTrack.artist}
            </p>
          </div>

          <button
            onClick={onToggleLikeTrack}
            className="text-[#c8c6c5] hover:text-white transition-colors ml-1 hidden sm:block cursor-pointer shrink-0"
            title="Like track"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isLiked ? 'text-[#1db954] material-symbols-filled' : ''
              }`}
            >
              {isLiked ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center justify-center w-1/3 max-w-[420px]">
          <div className="flex items-center gap-4 sm:gap-6 mb-1">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition-colors hidden sm:block cursor-pointer ${
                isShuffle ? 'text-[#1db954]' : 'text-[#c8c6c5] hover:text-white'
              }`}
              title="Shuffle"
            >
              <span className="material-symbols-outlined text-[18px]">shuffle</span>
            </button>

            <button
              onClick={onPrevTrack}
              className="text-[#c8c6c5] hover:text-white transition-colors cursor-pointer"
              title="Previous Track"
            >
              <span className="material-symbols-outlined text-[24px] material-symbols-filled">
                skip_previous
              </span>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-white hover:scale-105 active:scale-95 flex items-center justify-center text-black shadow-md transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="material-symbols-outlined text-[26px] material-symbols-filled">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              onClick={onNextTrack}
              className="text-[#c8c6c5] hover:text-white transition-colors cursor-pointer"
              title="Next Track"
            >
              <span className="material-symbols-outlined text-[24px] material-symbols-filled">
                skip_next
              </span>
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`transition-colors hidden sm:block cursor-pointer ${
                isRepeat ? 'text-[#1db954]' : 'text-[#c8c6c5] hover:text-white'
              }`}
              title="Repeat"
            >
              <span className="material-symbols-outlined text-[18px]">repeat</span>
            </button>
          </div>

          {/* Timeline Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[#c8c6c5] text-[11px] min-w-[32px] text-right">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative flex items-center group cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-[#353534] rounded-full appearance-none cursor-pointer accent-[#1db954]"
              />
            </div>
            <span className="text-[#c8c6c5] text-[11px] min-w-[32px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Extra Controls */}
        <div className="flex justify-end items-center gap-3.5 w-1/3 min-w-[150px]">
          <div className="hidden lg:flex items-center gap-3 text-[#c8c6c5]">
            <button
              onClick={() => setShowLyricsOverlay(!showLyricsOverlay)}
              className={`hover:text-white transition-colors cursor-pointer ${
                showLyricsOverlay ? 'text-[#1db954]' : ''
              }`}
              title="Audio Overview Script"
            >
              <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
            </button>

            <div className="flex items-center gap-2 group cursor-pointer">
              <button onClick={toggleMute} className="hover:text-white cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                </span>
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-[#353534] rounded-full appearance-none cursor-pointer accent-[#1db954]"
              />
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="text-[#c8c6c5] hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">graphic_eq</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Audio Script / Overview Drawer Overlay */}
      {showLyricsOverlay && (
        <div className="fixed bottom-24 right-4 z-50 w-80 md:w-96 bg-[#201f1f]/95 backdrop-blur-xl border border-[#353534] rounded-xl p-4 shadow-2xl text-left animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#353534]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1db954] animate-pulse"></span>
              <span className="text-[12px] font-bold text-[#1db954] uppercase tracking-wider">
                Now Narrating
              </span>
            </div>
            <button
              onClick={() => setShowLyricsOverlay(false)}
              className="text-[#c8c6c5] hover:text-white text-[18px]"
            >
              ×
            </button>
          </div>
          <p className="mt-3 text-[13px] text-[#e5e2e1] leading-relaxed italic">
            "{currentTrack.audioText}"
          </p>
          <div className="mt-3 pt-2 border-t border-[#353534] flex justify-between items-center text-[11px] text-[#c8c6c5]">
            <span>Voice Synthesizer: Active</span>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(currentTrack.audioText);
                  window.speechSynthesis.speak(utterance);
                }
              }}
              className="text-[#1db954] font-bold hover:underline"
            >
              Replay Audio
            </button>
          </div>
        </div>
      )}
    </>
  );
};
