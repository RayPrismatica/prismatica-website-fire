'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PrismaticaHeader.module.css';

export default function PrismaticaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header Bar - Entire bar is tappable */}
      <header
        className={styles.header}
        onClick={toggleMenu}
        role="button"
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
      >
        <div className={styles.logo}>
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

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
        />
      )}

      {/* Menu - slides from side on homepage, drops from top on other pages */}
      <nav className={`${styles.menu} ${isHomepage ? styles.menuSlide : styles.menuDrop} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          <Link href="/" className={styles.menuItem} onClick={closeMenu}>
            Home
          </Link>

          <div className={styles.menuDivider} />

          <Link href="/solutions" className={styles.menuItem} onClick={closeMenu}>
            Solutions
          </Link>

          <Link href="/what" className={styles.menuItem} onClick={closeMenu}>
            About
          </Link>

          <Link href="/articles" className={styles.menuItem} onClick={closeMenu}>
            Articles
          </Link>

          <div className={styles.menuDivider} />

          <Link href="/contact" className={`${styles.menuItem} ${styles.menuItemPrimary}`} onClick={closeMenu}>
            Contact
          </Link>

          {/* Footer */}
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
