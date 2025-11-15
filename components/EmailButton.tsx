'use client';

import { useState } from 'react';

interface EmailButtonProps {
  mailtoLink: string;
}

export default function EmailButton({ mailtoLink }: EmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@prismaticalab.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px', marginBottom: '24px' }}>
      <a
        href={mailtoLink}
        style={{
          display: 'inline-block',
          padding: '14px 28px',
          backgroundColor: '#D43225',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '17px',
          fontWeight: 600,
          transition: 'all 0.2s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b8281e'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D43225'}
      >
        Send Email
      </a>

      <button
        onClick={copyEmail}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'transparent',
          border: '1px solid #ddd',
          borderRadius: '4px',
          color: copied ? '#D43225' : '#666',
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#D43225';
          e.currentTarget.style.color = '#D43225';
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.borderColor = '#ddd';
            e.currentTarget.style.color = '#666';
          }
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        {copied ? 'Copied!' : 'Copy address'}
      </button>
    </div>
  );
}
