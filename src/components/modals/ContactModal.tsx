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

    // Two things went wrong with earlier attempts:
    //  - A plain `mailto:` link hands off to whatever mail app the OS has
    //    set as default (Outlook, Apple Mail, etc.), not Gmail specifically.
    //  - The `mail.google.com` compose URL is a *web* URL. Mobile OSes don't
    //    reliably route that into the Gmail app, so it usually just opens in
    //    the mobile browser and, if you're not already signed into Gmail
    //    there, bounces you into a Google/Workspace sign-in page.
    //
    // The fix: deep-link straight into the Gmail app using each platform's
    // own mechanism — iOS and Android are NOT interchangeable here:
    //  - iOS:            Gmail registers the custom scheme `googlegmail://`.
    //  - Android:         custom schemes aren't used for this; instead we
    //                     build an `intent://` URL that explicitly targets
    //                     the Gmail app's package (`com.google.android.gm`),
    //                     with a fallback URL Chrome handles natively if
    //                     that package isn't installed.
    //  - Windows / macOS: there's no OS-level "open the Gmail app" protocol
    //                     to hook into — Gmail's desktop presence *is*
    //                     mail.google.com (whether in a browser tab or
    //                     installed as a Chrome PWA, both live at that same
    //                     origin). Opening that URL is the correct and only
    //                     mechanism on desktop, and it's what "the Gmail
    //                     app" resolves to on Windows/Mac.
    // Across all platforms, if the Gmail app isn't installed, we land on
    // Gmail on the web — never Outlook or another mail client.
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    // Windows and macOS both fall through to the desktop branch below —
    // there's no separate deep-link mechanism for either.

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PROFILE_INFO.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (isIOS) {
      const gmailAppUrl = `googlegmail://co?to=${encodeURIComponent(
        PROFILE_INFO.email
      )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // If the Gmail app is installed, this navigation gets intercepted
      // immediately and the page never actually unloads to the fallback.
      // If it's not installed, nothing happens, and the timeout below
      // fires and sends the browser to Gmail on the web instead.
      const fallbackTimer = window.setTimeout(() => {
        window.location.href = gmailWebUrl;
      }, 600);

      // If the app opens, the browser tab typically backgrounds/unloads,
      // which we use as a signal to cancel the fallback.
      window.addEventListener(
        'pagehide',
        () => window.clearTimeout(fallbackTimer),
        { once: true }
      );

      window.location.href = gmailAppUrl;
    } else if (isAndroid) {
      // Android's Gmail app doesn't use a custom URL scheme for this.
      // Instead, build an `intent://` URL (Chrome-specific, but Chrome is
      // the default browser on the vast majority of Android devices) that
      // explicitly targets the Gmail app's package. The
      // `S.browser_fallback_url` param is handled natively by Chrome: if
      // the target package isn't installed, Chrome itself navigates to
      // that fallback URL — no manual timers/listeners needed here.
      //
      // IMPORTANT: the underlying scheme here must be `mailto`, not a made
      // up `googlegmail` scheme. `googlegmail://` is the iOS custom URL
      // scheme only — the Gmail Android app never registers an
      // intent-filter for it, so even with `package=` pinned, Android
      // can't resolve the intent to any activity and Chrome silently
      // falls back to the web URL (which is why it was landing on
      // accounts.google.com / workspace.google.com). Gmail's Android app
      // *does* register itself as a handler for `mailto:` (ACTION_SENDTO)
      // links, so building the intent around that scheme, with the email
      // address as the host, is what actually resolves to Gmail.
      const intentUrl =
        `intent://${encodeURIComponent(PROFILE_INFO.email)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}` +
        `#Intent;scheme=mailto;package=com.google.android.gm;` +
        `S.browser_fallback_url=${encodeURIComponent(gmailWebUrl)};end`;

      window.location.href = intentUrl;
    } else {
      // Windows / macOS (and any other non-mobile platform): open Gmail
      // on the web in a new tab, prepopulated. If the person has Gmail
      // installed as a desktop PWA and it's registered as the OS handler
      // for mail.google.com, the OS will route it there automatically;
      // otherwise it opens as a normal browser tab. Either way it's Gmail.
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
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
