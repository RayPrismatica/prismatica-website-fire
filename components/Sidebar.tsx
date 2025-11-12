'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <Link
          href="/"
          className={`nav-item block w-full text-left ${isActive('/') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          Focus
        </Link>

        <Link
          href="/what"
          className={`nav-item block w-full text-left ${isActive('/what') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/what') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          What We Do
        </Link>

        <Link
          href="/mental-models"
          className={`nav-item block w-full text-left ${isActive('/mental-models') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/mental-models') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          Mental Models
        </Link>

        <Link
          href="/consulting"
          className={`nav-item block w-full text-left ${isActive('/consulting') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/consulting') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s',
            marginTop: '24px'
          }}
        >
          Direct Engagement
        </Link>

        <Link
          href="/products"
          className={`nav-item block w-full text-left ${isActive('/products') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/products') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          Product Suite
        </Link>

        <Link
          href="/articles"
          className={`nav-item block w-full text-left ${isActive('/articles') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/articles') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s',
            marginTop: '24px'
          }}
        >
          Articles
        </Link>

        <Link
          href="/who-we-are"
          className={`nav-item block w-full text-left ${isActive('/who-we-are') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/who-we-are') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          Who We Are
        </Link>

        <Link
          href="/contact"
          className={`nav-item block w-full text-left ${isActive('/contact') ? 'active' : ''}`}
          style={{
            padding: '8px 0',
            color: isActive('/contact') ? '#D43225' : '#222',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s'
          }}
        >
          Contact
        </Link>
      </div>
      <div style={{ flexGrow: 1, minHeight: '24px' }} />
      <div className="sidebar-logo" style={{ flexShrink: 0, paddingBottom: 0 }}>
        <Image
          src="/images/logowebp.webp"
          alt="Prismatica Labs Logo"
          width={1840}
          height={1691}
          style={{ width: '40px', height: 'auto', marginBottom: '8px' }}
        />
        <h1 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.5px', margin: 0, textAlign: 'left' }}>PRISMATICA LABS</h1>
      </div>
    </nav>
  );
}
