// Example: Client-side component approach
// Use this if you prefer client-side loading

'use client';

import DynamicNewsInsight from '@/components/DynamicNewsInsight';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>

      {/* Component fetches content client-side */}
      <p><DynamicNewsInsight /></p>

      <p>The rest of your static content here...</p>
    </main>
  );
}
