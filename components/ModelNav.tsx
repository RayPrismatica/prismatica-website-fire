'use client';

import Link from 'next/link';

interface ModelNavProps {
  currentModel: 'demand' | 'incentives' | 'agentic' | 'prismatic' | 'triptych';
}

const models = [
  { id: 'demand', label: 'DEMAND', path: '/demand' },
  { id: 'incentives', label: 'INCENTIVES', path: '/incentives' },
  { id: 'agentic', label: 'AGENTIC', path: '/agentic' },
  { id: 'prismatic', label: 'PRISMATIC', path: '/prismatic' },
  { id: 'triptych', label: 'TRIPTYCH', path: '/triptych' },
];

export default function ModelNav({ currentModel }: ModelNavProps) {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        marginBottom: '32px',
        paddingBottom: '8px',
      }}
      className="model-nav"
    >
      <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Link
          href="/about"
          style={{
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#999',
            textDecoration: 'none',
            transition: 'color 0.2s',
            paddingBottom: '4px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
        >
          ← OVERVIEW
        </Link>
        <span style={{ color: '#e0e0e0', margin: '0 8px', fontSize: '11px' }}>|</span>
      </span>
      {models.map((model, index) => {
        const isActive = model.id === currentModel;

        return (
          <span key={model.id} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {isActive ? (
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: '"Noto Sans", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#000',
                  borderBottom: '3px solid #D43225',
                  paddingBottom: '4px',
                }}
              >
                {model.label}
              </span>
            ) : (
              <Link
                href={model.path}
                style={{
                  fontSize: '11px',
                  fontFamily: '"Noto Sans", sans-serif',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: '#999',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  paddingBottom: '4px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                {model.label}
              </Link>
            )}
            {index < models.length - 1 && (
              <span style={{ color: '#e0e0e0', margin: '0 8px', fontSize: '11px' }}>|</span>
            )}
          </span>
        );
      })}

      <style jsx>{`
        .model-nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
