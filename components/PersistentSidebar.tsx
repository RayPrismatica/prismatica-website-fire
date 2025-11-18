'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function PersistentSidebar() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On homepage: Only show mobile header (nothing on desktop)
  if (isHomepage) {
    return (
      <>
        {/* Mobile Header Only - hidden on desktop via CSS, entire banner toggles menu */}
        <div
          className="mobile-header"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

        {/* Full Sidebar for mobile menu */}
        {isMobileMenuOpen && <Sidebar isHomepage={true} />}
      </>
    );
  }

  return <Sidebar isHomepage={false} />;
}
