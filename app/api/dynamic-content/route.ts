import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fallback content with all 12 fields
const fallbackContent = {
  newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
  patternInsight: "You're still reading. That already puts you ahead.",
  intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?",
  consultingInsight: "We were just reading how McKinsey's workforce transformation framework helps Fortune 500s navigate talent crises. Brilliant methodology, decades of pattern recognition. But what if that calibre of strategic workforce insight wasn't confined to seven-figure engagements?",
  contentReminder: "Remember how the landing page showed market paradoxes that most organisations miss?",
  marketObservation: "This week three different CEOs asked us about retention whilst their job ads promised nothing worth staying for.",
  purposeContext: "Notice how companies struggling to innovate can't actually articulate what innovation means beyond industry buzzwords?",
  serviceDescription: "Most businesses chase quarterly targets whilst wondering why purpose feels performative. We excavate what your organisation actually means beyond financial metrics, then engineer that meaning into every decision and customer moment.",
  esiDescription: "Everyone knew the problem, nobody had a system to fix it. Explore, Synthesize, Ignite: our method for closing insight-to-action gaps. Not three separate engagements but one continuous system.",
  agencyDescription: "We work with executives who've optimised for hours instead of outcomes, inbox management instead of market impact. Time to optimise for leverage, not labour.",
  ksoDescription: "Traditional SEO optimises for yesterday's game. KSO Workshop: we transform your expertise into knowledge graphs that AI systems actually cite and reference.",
  transactionDescription: "Most brands choose heart or head, rarely both. Transaction Architecture maps how decisions actually happen across emotional resonance, cognitive understanding, and action triggers.",
  triptychDescription: "Strategic Triptych Assessment examines how you market, compete, and execute simultaneously. Problems hide where functions don't talk. So do your biggest opportunities."
};

export async function GET() {
  try {
    const blobUrl = process.env.BLOB_URL || 'https://your-blob-store.public.blob.vercel-storage.com/dynamic-content.json';

    // Fetch from Vercel Blob
    const response = await fetch(blobUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch from Blob:', response.status);
      return NextResponse.json(fallbackContent);
    }

    const cache = await response.json();

    // Check if cache is still valid (24 hours = 1440 minutes)
    const generated = new Date(cache.generated);
    const now = new Date();
    const ageInMinutes = (now.getTime() - generated.getTime()) / 60000;

    if (ageInMinutes > 1440) {
      // Serve fallback if cache is stale (older than 24 hours)
      console.log(`Content is ${ageInMinutes} minutes old, serving fallback`);
      return NextResponse.json(fallbackContent);
    }

    const apiResponse = NextResponse.json(cache.content);
    apiResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return apiResponse;
  } catch (error) {
    console.error('Error serving dynamic content:', error);
    // If any error, serve fallback
    return NextResponse.json(fallbackContent);
  }
}
