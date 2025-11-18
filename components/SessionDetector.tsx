'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SessionDetector() {
  const pathname = usePathname();

  useEffect(() => {
    // Mark that user has navigated if they're not on homepage
    // This is tracked but no longer triggers redirects
    // Homepage is accessible via back button, just not in navigation menu
    if (pathname !== '/') {
      sessionStorage.setItem('hasNavigated', 'true');
    }
  }, [pathname]);

  return null;
}
