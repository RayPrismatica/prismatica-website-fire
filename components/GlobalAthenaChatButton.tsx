'use client';

import { useAthenaChat } from '@/contexts/AthenaChatContext';

export default function GlobalAthenaChatButton() {
  const { openChat, isOpen } = useAthenaChat();

  // Hide button when chat is open - no redundant UI elements
  if (isOpen) return null;

  return (
    // Desktop only - hidden on mobile/tablet (shows at md = 768px+ for testing)
    <button
      onClick={openChat}
      aria-label="Chat with Athena"
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#D43225', // Prismatica Red - primary action color
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(212, 50, 37, 0.25)', // Red shadow for brand consistency
        transition: 'all 0.2s',
        zIndex: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 50, 37, 0.35)';
        e.currentTarget.style.backgroundColor = '#B82919'; // Hover state per VISUAL_IDENTITY.md
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 50, 37, 0.25)';
        e.currentTarget.style.backgroundColor = '#D43225';
      }}
    >
      {/* Message bubble icon - simple, clear */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
