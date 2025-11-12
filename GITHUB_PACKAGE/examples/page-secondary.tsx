// Example: app/about/page.tsx
// Secondary page with intelligence example

import { getDynamicContent } from '@/lib/getDynamicContent';

export const revalidate = 0; // Disable caching

export default async function AboutPage() {
  const content = await getDynamicContent();

  return (
    <main>
      <h1>About Us</h1>

      <p>We believe in asking better questions...</p>

      {/* This references the same story as the landing page */}
      <p>{content.intelligenceExample}</p>

      <p>More static content...</p>
    </main>
  );
}
