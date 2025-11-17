'use client';

import { useState } from 'react';
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

  return (
    <>
      {/* Mobile Header Bar */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logowebp.webp"
            alt="Prismatica Labs"
            width={30}
            height={30}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>PRISMATICA LABS</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          <Link href="/" className={styles.menuItem} onClick={closeMenu}>
            Home
          </Link>

          <div className={styles.menuDivider} />

          <Link href="/solutions" className={styles.menuItem} onClick={closeMenu}>
            Solutions
          </Link>

          <Link href="/about" className={styles.menuItem} onClick={closeMenu}>
            About
          </Link>

          <Link href="/articles" className={styles.menuItem} onClick={closeMenu}>
            Articles
          </Link>

          <div className={styles.menuDivider} />

          <Link href="/contact" className={`${styles.menuItem} ${styles.menuItemPrimary}`} onClick={closeMenu}>
            Contact
          </Link>

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
