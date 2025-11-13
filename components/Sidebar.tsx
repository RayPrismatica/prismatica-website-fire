'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCarmenChat } from '@/contexts/CarmenChatContext';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, openChat, closeChat } = useCarmenChat();

  const isActive = (path: string) => pathname === path;

  const mentalModelsSubPages = ['/triptych', '/demand', '/incentives', '/agentic', '/prismatic'];
  const isMentalModelsActive = pathname === '/mental-models' || mentalModelsSubPages.includes(pathname);

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
            className={`nav-item block w-full text-left ${isMentalModelsActive ? 'active' : ''}`}
            style={{
              padding: '8px 0',
              color: isMentalModelsActive ? '#D43225' : '#222',
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

          <button
            onClick={() => {
              if (isOpen) {
                closeChat();
              } else {
                openChat();
              }
              closeMobileMenu();
            }}
            className="block w-full text-left transition-all hover:shadow-md"
            style={{
              marginTop: '24px',
              background: isOpen ? '#f5f5f5' : 'white',
              border: '1px solid #e5e5e5',
              cursor: 'pointer',
              borderRadius: '12px',
              padding: '16px 12px',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Image
                  src="/images/carmen-advisor.jpg"
                  alt="Carmen"
                  width={40}
                  height={40}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  display: 'block',
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  border: '2px solid white'
                }}></span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#222',
                  fontFamily: '"Noto Sans", sans-serif',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {isOpen ? (
                    <>
                      <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Close
                    </>
                  ) : (
                    <>
                      Open
                      <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  fontFamily: '"Noto Sans", sans-serif',
                  marginTop: '4px'
                }}>
                  Strategic AI Advisor
                </div>
              </div>
            </div>
          </button>
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
              onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
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
