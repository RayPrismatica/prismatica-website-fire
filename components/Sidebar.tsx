'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="mobile-header">
        <button
          className="hamburger-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src="/images/logowebp.webp"
            alt="Prismatica Labs Logo"
            width={30}
            height={30}
            style={{ width: '30px', height: 'auto' }}
          />
          <h1 style={{
            fontFamily: 'var(--font-passion), sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            margin: 0
          }}>
            PRISMATICA LABS
          </h1>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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
            onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
          >
            What We Do
          </Link>

          <Link
            href="/engagement"
            className={`nav-item block w-full text-left ${isActive('/engagement') ? 'active' : ''}`}
            style={{
              padding: '8px 0',
              color: isActive('/engagement') ? '#D43225' : '#222',
              textDecoration: 'none',
              fontSize: '11px',
              fontFamily: '"Noto Sans", sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'opacity 0.2s',
              marginTop: '24px'
            }}
            onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
          >
            Product Suite
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
              transition: 'opacity 0.2s',
              marginTop: '24px'
            }}
            onClick={closeMobileMenu}
          >
            Who We Are
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
            onClick={closeMobileMenu}
          >
            Mental Models
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
              transition: 'opacity 0.2s'
            }}
            onClick={closeMobileMenu}
          >
            Articles
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
            onClick={closeMobileMenu}
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
          <p style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '9px', color: '#999', margin: '4px 0 0 0', textAlign: 'left' }}>© 2025 Prismatica Labs Limited</p>
        </div>
      </nav>
    </>
  );
}
