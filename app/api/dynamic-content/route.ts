import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Check /tmp first (Vercel), then data directory (local)
    const tmpPath = path.join('/tmp', 'dynamic-content.json');
    const dataPath = path.join(process.cwd(), 'data', 'dynamic-content.json');
    const filePath = fs.existsSync(tmpPath) ? tmpPath : dataPath;

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?"
      });
    }

    const cache = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Check if cache is still valid
    const generated = new Date(cache.generated);
    const now = new Date();
    const ageInMinutes = (now.getTime() - generated.getTime()) / 60000;

    if (ageInMinutes > 70) {
      // Serve fallback if cache is stale
      return NextResponse.json({
        newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
        patternInsight: "You're still reading. That already puts you ahead.",
        intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?"
      });
    }

    const response = NextResponse.json(cache.content);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return response;
  } catch (error) {
    console.error('Error serving dynamic content:', error);
    // If any error, serve fallback
    return NextResponse.json({
      newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
      patternInsight: "You're still reading. That already puts you ahead.",
      intelligenceExample: "The unemployment news, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?"
    });
  }
}
