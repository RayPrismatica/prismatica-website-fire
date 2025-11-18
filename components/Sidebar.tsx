'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isHomepage = false }: { isHomepage?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Disable sidebar transition on initial load to prevent flash
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const isActive = (path: string) => pathname === path;


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMobileMenu();
  };

  // Inline hover handler for menu items
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getMenuItemStyle = (path: string, isActiveItem: boolean, hasTopMargin = false) => ({
    padding: '16px 0',
    paddingLeft: hoveredItem === path ? '8px' : '0',
    color: isActiveItem ? '#D43225' : '#222',
    textDecoration: 'none',
    fontSize: '15px',
    fontFamily: '"Noto Sans", sans-serif',
    fontWeight: isActiveItem ? 700 : 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    transition: 'color 0.2s, padding-left 0.2s',
    position: 'relative' as const,
    borderBottom: isActiveItem ? '2px solid #D43225' : '1px solid #f0f0f0',
    marginTop: hasTopMargin ? '12px' : '0'
  });

  return (
    <>
      {/* Mobile Header - Entire banner toggles menu */}
      <div
        className="mobile-header"
        onClick={toggleMobileMenu}
        style={{ cursor: 'pointer' }}
      >
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

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''} ${isInitialLoad ? 'no-transition' : ''} ${isHomepage ? 'homepage-mode' : ''}`}>
        <div className="sidebar-content">
          <Link
            href="/consulting"
            className={`nav-item block w-full text-left ${isActive('/consulting') ? 'active' : ''}`}
            style={getMenuItemStyle('/consulting', isActive('/consulting'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/consulting')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/consulting' && !isActive('/consulting') && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '20px',
                background: '#D43225'
              }} />
            )}
            Solutions
          </Link>

          <Link
            href="/about"
            className={`nav-item block w-full text-left ${isActive('/about') ? 'active' : ''}`}
            style={getMenuItemStyle('/about', isActive('/about'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/about')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/about' && !isActive('/about') && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '20px',
                background: '#D43225'
              }} />
            )}
            About Us
          </Link>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e0e0e0', margin: '0' }} />

          <Link
            href="/contact"
            className={`nav-item block w-full text-left ${isActive('/contact') ? 'active' : ''}`}
            style={getMenuItemStyle('/contact', isActive('/contact'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/contact')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/contact' && !isActive('/contact') && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '20px',
                background: '#D43225'
              }} />
            )}
            Contact
          </Link>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e0e0e0', margin: '0' }} />

          {/* Philosophy note */}
          <p className="sidebar-philosophy" style={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '11px',
            lineHeight: '1.6',
            color: '#666',
            margin: '32px 0 0 0',
            fontStyle: 'italic'
          }}>
            Simplest site we could make. Everything worth reading is here. Anything else needs a conversation. Time's finite.
          </p>
        </div>
        <div style={{ flexGrow: 1, minHeight: '24px' }} />
        <div className="sidebar-logo" style={{ flexShrink: 0, paddingBottom: 0 }}>
          <Link href="/" onClick={handleNavClick} style={{ display: 'block', cursor: 'pointer' }}>
            <Image
              src="/images/logowebp.webp"
              alt="Prismatica Labs Logo"
              width={1840}
              height={1691}
              style={{ width: '40px', height: 'auto', marginBottom: '8px' }}
            />
            <h1 style={{ fontFamily: 'var(--font-passion), sans-serif', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.5px', margin: 0, textAlign: 'left' }}>PRISMATICA LABS</h1>
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', marginBottom: '4px' }}>
            <Link
              href="/products"
              onClick={handleNavClick}
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '9px',
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
            >
              Products
            </Link>
            <span style={{ fontSize: '9px', color: '#e0e0e0' }}>•</span>
            <Link
              href="/articles"
              onClick={handleNavClick}
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '9px',
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
            >
              Articles
            </Link>
            <span style={{ fontSize: '9px', color: '#e0e0e0' }}>•</span>
            <Link
              href="/privacy"
              onClick={handleNavClick}
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '9px',
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
            >
              Privacy
            </Link>
            <span style={{ fontSize: '9px', color: '#e0e0e0' }}>•</span>
            <Link
              href="/terms"
              onClick={handleNavClick}
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '9px',
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
            >
              Terms
            </Link>
          </div>
          <p style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '9px', color: '#999', margin: '0', textAlign: 'left' }}>© 2025 Prismatica Labs Limited</p>
        </div>
      </nav>
    </>
  );
}
