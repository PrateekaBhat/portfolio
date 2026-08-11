import React, { useState } from 'react';
import { PROFILE_INFO } from '../../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Message from ${name.trim() || 'Visitor'} — Prateeka's Portfolio`;
    const body = `Hi Prateeka,

${name.trim()}
${email.trim()}

Message

${message.trim()}

---
Sent via Prateeka's Portfolio`;

    // On phones/tablets, the Gmail *web* compose URL forces users through a
    // Google Workspace sign-in/account-creation flow if they aren't already
    // signed into Gmail in the mobile browser. Instead, use a `mailto:` link
    // there so it hands off to the device's native mail app (Gmail app, if
    // that's the default) with everything prepopulated — same experience as
    // tapping "Compose" on a laptop, just via the OS instead of the browser.
    const isMobile =
      typeof navigator !== 'undefined' &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const mailtoUrl = `mailto:${encodeURIComponent(PROFILE_INFO.email)}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        PROFILE_INFO.email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open Web Gmail in a new tab with prepopulated fields
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }

    // Reset and close modal
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#181818] border border-[#353534] rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c8c6c5] hover:text-white p-2 rounded-full hover:bg-[#282828] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1db954]/20 text-[#1db954] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">mail</span>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white">Let's Connect</h2>
            <p className="text-[13px] text-[#c8c6c5]">
              Have an opportunity, an idea, a project, or just something interesting to talk about? I'd love to hear from you.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#c8c6c5] uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full bg-[#242424] border border-[#383838] focus:border-[#1db954] focus:outline-none text-white rounded-xl px-4 py-2.5 text-[14px] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c8c6c5] uppercase tracking-wider mb-1.5">
              Your Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full bg-[#242424] border border-[#383838] focus:border-[#1db954] focus:outline-none text-white rounded-xl px-4 py-2.5 text-[14px] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#c8c6c5] uppercase tracking-wider mb-1.5">
              Your Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me a little about what you'd like to discuss..."
              className="w-full bg-[#242424] border border-[#383838] focus:border-[#1db954] focus:outline-none text-white rounded-xl p-4 text-[14px] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1db954] hover:bg-[#53e076] text-[#002108] font-bold text-[14.5px] shadow-lg shadow-[#1db954]/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            <span>Send Message</span> 
          </button>
          <span className="block mt-3 text-center text-xs text-white/45">
            You'll be taken to Gmail to review and send your message.
          </span>
        </form>
      </div>
    </div>
  );
};
