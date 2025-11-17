'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Disable sidebar transition on initial load to prevent flash
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const isActive = (path: string) => pathname === path;

  const mentalModelsSubPages = ['/triptych', '/demand', '/incentives', '/agentic', '/prismatic'];
  const isMentalModelsActive = pathname === '/mental-models' || mentalModelsSubPages.includes(pathname);

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
      {/* Mobile Header - Entire bar is tappable */}
      <div
        className="mobile-header"
        onClick={toggleMobileMenu}
        role="button"
        aria-label="Toggle menu"
        style={{ cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src="/images/logowebp.webp"
            alt="Prismatica Labs Logo"
            width={30}
            height={30}
            style={{ width: '30px', height: 'auto', pointerEvents: 'none' }}
          />
          <h1 style={{
            fontFamily: 'var(--font-passion), sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            margin: 0,
            pointerEvents: 'none'
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
      <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''} ${isInitialLoad ? 'no-transition' : ''}`}>
        <div className="sidebar-content">
          <Link
            href="/"
            className={`nav-item block w-full text-left ${isActive('/') ? 'active' : ''}`}
            style={getMenuItemStyle('/', isActive('/'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/' && !isActive('/') && (
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
            Home
          </Link>

          <Link
            href="/what"
            className={`nav-item block w-full text-left ${isActive('/what') ? 'active' : ''}`}
            style={getMenuItemStyle('/what', isActive('/what'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/what')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/what' && !isActive('/what') && (
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
            About
          </Link>

          <Link
            href="/articles"
            className={`nav-item block w-full text-left ${isActive('/articles') ? 'active' : ''}`}
            style={getMenuItemStyle('/articles', isActive('/articles'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/articles')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/articles' && !isActive('/articles') && (
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
            Articles
          </Link>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e0e0e0', margin: '12px 0' }} />

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
            href="/products"
            className={`nav-item block w-full text-left ${isActive('/products') ? 'active' : ''}`}
            style={getMenuItemStyle('/products', isActive('/products'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/products')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/products' && !isActive('/products') && (
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
            Products
          </Link>

          <Link
            href="/who-we-are"
            className={`nav-item block w-full text-left ${isActive('/who-we-are') ? 'active' : ''}`}
            style={getMenuItemStyle('/who-we-are', isActive('/who-we-are'))}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/who-we-are')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/who-we-are' && !isActive('/who-we-are') && (
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
            Who We Are
          </Link>

          <Link
            href="/mental-models"
            className={`nav-item block w-full text-left ${isMentalModelsActive ? 'active' : ''}`}
            style={getMenuItemStyle('/mental-models', isMentalModelsActive)}
            onClick={handleNavClick}
            onMouseEnter={() => setHoveredItem('/mental-models')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {hoveredItem === '/mental-models' && !isMentalModelsActive && (
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
            Mental Models
          </Link>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e0e0e0', margin: '12px 0' }} />

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
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', marginBottom: '4px' }}>
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
