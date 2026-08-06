import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'New Episode Added: NVIDIA AI Podcast',
      time: 'Recently',
      desc: 'Explore enterprise generative AI infrastructure benchmarks in Podcasts & Talks.',
      type: 'podcast',
    },
  ];

  return (
    <div className="fixed top-16 right-4 md:right-12 z-50 w-80 md:w-96 bg-[#181818] border border-[#353534] rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between border-b border-[#353534] pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1db954] text-[20px]">notifications</span>
          <h3 className="font-bold text-[15px] text-white">What's New</h3>
        </div>
        <button
          onClick={onClose}
          className="text-[#c8c6c5] hover:text-white text-[18px] cursor-pointer"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.map((n) => (
          <div key={n.id} className="p-3 bg-[#201f1f] rounded-xl border border-[#353534] space-y-1">
            <div className="flex justify-between items-center text-[11px] font-bold text-[#1db954]">
              <span>{n.title}</span>
              <span className="text-[#c8c6c5] font-normal">{n.time}</span>
            </div>
            <p className="text-[12.5px] text-[#c8c6c5] leading-snug">{n.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#353534] flex justify-between items-center text-[12px]">
        <button onClick={onClear} className="text-[#1db954] font-bold hover:underline">
          Mark All Read
        </button>
        <span className="text-[#c8c6c5]">{notifications.length} Update</span>
      </div>
    </div>
  );
};
