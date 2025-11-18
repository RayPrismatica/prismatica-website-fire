'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileHeader.module.css';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Header Bar - Entire header is clickable */}
      <header
        className={styles.header}
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <div className={styles.headerContent}>
          <Image
            src="/images/logowebp.webp"
            alt="Prismatica Labs"
            width={30}
            height={30}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>PRISMATICA LABS</span>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          {/* Close area at top (tap header area to close) */}
          <div className={styles.menuHeader} onClick={closeMenu}>
            <Image
              src="/images/logowebp.webp"
              alt="Prismatica Labs"
              width={30}
              height={30}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>PRISMATICA LABS</span>
            <span className={styles.closeIndicator}>✕</span>
          </div>

          {/* Menu Items */}
          <div className={styles.menuItems}>
            <Link href="/" className={styles.menuItem} onClick={closeMenu}>
              Home
            </Link>

            <div className={styles.menuDivider} />

            <Link href="/solutions" className={styles.menuItem} onClick={closeMenu}>
              Solutions
            </Link>

            <Link href="/about" className={styles.menuItem} onClick={closeMenu}>
              About Us
            </Link>

            <Link href="/articles" className={styles.menuItem} onClick={closeMenu}>
              Articles
            </Link>

            <div className={styles.menuDivider} />

            <Link href="/contact" className={`${styles.menuItem} ${styles.menuItemPrimary}`} onClick={closeMenu}>
              Contact
            </Link>
          </div>

          {/* Footer in menu */}
          <div className={styles.menuFooter}>
            <div className={styles.menuFooterLinks}>
              <Link href="/privacy" className={styles.footerLink} onClick={closeMenu}>
                Privacy
              </Link>
              <span className={styles.footerDot}>•</span>
              <Link href="/terms" className={styles.footerLink} onClick={closeMenu}>
                Terms
              </Link>
            </div>
            <p className={styles.copyright}>© 2025 Prismatica Labs</p>
          </div>
        </div>
      </nav>
    </>
  );
}
