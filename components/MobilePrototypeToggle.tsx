'use client';

import { useMobilePrototype } from '@/contexts/MobilePrototypeContext';

export default function MobilePrototypeToggle() {
  const { isPrototypeEnabled, togglePrototype } = useMobilePrototype();

  // Only show on mobile viewports (development helper)
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    return null;
  }

  return (
    <button
      onClick={togglePrototype}
      style={{
        position: 'fixed',
        bottom: '50%',
        left: '20px',
        transform: 'translateY(50%)',
        zIndex: 9999,
        backgroundColor: isPrototypeEnabled ? '#D43225' : '#666',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={isPrototypeEnabled ? 'Disable mobile prototype features' : 'Enable mobile prototype features'}
    >
      {isPrototypeEnabled ? '✨' : '👁️'}
    </button>
  );
}
