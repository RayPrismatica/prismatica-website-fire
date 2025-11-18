'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function SessionDetector() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user has navigated before
    const hasNavigated = sessionStorage.getItem('hasNavigated');

    // If on homepage (threshold) and user has already navigated, redirect to welcome
    if (pathname === '/' && hasNavigated === 'true') {
      router.replace('/welcome');
      return;
    }

    // Mark that user has navigated if they're not on homepage
    if (pathname !== '/') {
      sessionStorage.setItem('hasNavigated', 'true');
    }
  }, [pathname, router]);

  return null;
}
