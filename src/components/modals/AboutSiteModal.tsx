import React, { useEffect } from 'react';

interface AboutSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutSiteModal: React.FC<AboutSiteModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape (keyboard/laptop) and lock background scroll while open
  // so a tap-drag on mobile doesn't scroll the page behind the modal.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-site-modal-title"
        className="bg-[#181818] border border-[#353534] rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative space-y-5 max-h-[85vh] overflow-y-auto no-scrollbar text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 md:top-5 md:right-5 w-10 h-10 flex items-center justify-center text-[#c8c6c5] hover:text-white rounded-full hover:bg-[#282828] active:bg-[#333] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Spinning vinyl-style icon */}
        <div className="flex justify-center pt-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1db954] flex items-center justify-center shadow-lg shadow-[#1db954]/30 animate-spin-slow">
            <span className="material-symbols-outlined text-[28px] md:text-[32px] text-black material-symbols-filled">
              graphic_eq
            </span>
          </div>
        </div>

        <div className="space-y-3 px-1">
          <h2 id="about-site-modal-title" className="text-[18px] md:text-[20px] font-bold text-white">
            Recognize the vibe?
          </h2>
          <p className="text-[14px] md:text-[14.5px] text-[#c8c6c5] leading-relaxed">
            You're right — it's <span className="text-[#1db954] font-semibold">Spotify-inspired</span>.
            Music is a big part of my life, and Spotify is where most of it happens. 
            So when I built my portfolio, taking inspiration from an app I use every day made sense.
          </p>
          <p className="text-[14px] md:text-[14.5px] text-[#c8c6c5] leading-relaxed">
            Consider this page my <span className="text-white font-medium">Top Track</span> —
            engineering is the melody, curiosity is the rhythm. Thanks for hitting play.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-[#1db954] hover:bg-[#53e076] text-[#002108] font-bold text-[13.5px] uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Keep exploring
          </button>
        </div>
      </div>
    </div>
  );
};