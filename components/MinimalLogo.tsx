'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MinimalLogo() {
  return (
    <Link
      href="/"
      className="minimal-logo"
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 50,
        textDecoration: 'none',
        transition: 'opacity 0.2s',
        opacity: 0.9
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
    >
      <Image
        src="/images/logowebp.webp"
        alt="Prismatica Labs"
        width={32}
        height={32}
        style={{ width: '32px', height: 'auto' }}
      />
      <h1 style={{
        fontFamily: 'var(--font-passion), sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        margin: 0,
        color: '#222'
      }}>
        PRISMATICA LABS
      </h1>
    </Link>
  );
}
