import fs from 'fs';
import path from 'path';

interface DynamicContent {
  newsInsight: string;
  patternInsight: string;
  intelligenceExample: string;
  consultingInsight: string;
  contentReminder?: string;
  marketObservation?: string;
  purposeContext?: string;
  serviceDescription?: string;
  esiDescription?: string;
  agencyDescription?: string;
  ksoDescription?: string;
  transactionDescription?: string;
  triptychDescription?: string;
  generated?: string;
}

const fallbackContent: DynamicContent = {
  newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
  patternInsight: "You're still reading. That already puts you ahead.",
  intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?",
  consultingInsight: "We were just reading about how the big consulting firms built something remarkable. World class thinking, rigorous frameworks, proven methodologies. But what if that caliber of strategic insight wasn't locked behind day rates? What if the mental models that transform Fortune 500 companies could be infrastructure instead of scarcity?",
  contentReminder: "Remember how the landing page showed CEOs hiring for predictability, and the What We Do page wondered which skills are becoming obsolete?",
  marketObservation: "Right now we're watching companies panic about efficiency while missing the real pattern: their best people are solving the wrong problems brilliantly.",
  purposeContext: "The companies surviving best are the ones whose teams already knew the answer to 'why do we exist beyond making money?'",
  serviceDescription: "Dissect your business from its root reason to exist. Then cascade that purpose through every system and touchpoint. Inside-out authenticity that strengthens both internal culture and external message. Purpose as operating system, not marketing tagline.",
  esiDescription: "Explore, Synthesize, Ignite. Our operating system for transformation. Explore uncovers truth. Synthesize turns discovery into clarity. Ignite makes clarity executable. Research, strategy, and execution as a continuous loop.",
  agencyDescription: "For high-performers who realize their 70-hour weeks produce 40 hours of value. Secret Agency: where executives learn to optimize for impact, not inbox zero. Because busy and effective stopped being the same thing years ago.",
  ksoDescription: "The future of discoverability isn't about links. It's about ideas. In a world where AI systems index knowledge instead of URLs, authority belongs to those who own the narrative. We dissect your business DNA and rebuild it as a knowledge graph of authority.",
  transactionDescription: "Vision to transaction to validation. Map how value exchanges actually happen across three dimensions: spiritual (emotional resonance), cognitive (understanding shifts), and tangible (measurable actions). Then design every touchpoint to trigger those transactions. Conversion through understanding, not manipulation.",
  triptychDescription: "We examine your business through three lenses simultaneously: how you market, how you compete, how you build. Most problems live in the gaps between these. Most opportunities too."
};

export async function getDynamicContent(): Promise<DynamicContent> {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'dynamic-content.json');

    if (!fs.existsSync(dataPath)) {
      return fallbackContent;
    }

    const cache = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Check if cache is still valid (48 hours = 2880 minutes)
    // This is a safety fallback in case GitHub Actions/Vercel systems fail
    const generated = new Date(cache.generated);
    const now = new Date();
    const ageInMinutes = (now.getTime() - generated.getTime()) / 60000;

    if (ageInMinutes > 2880) { // 48 hours
      return fallbackContent;
    }

    return {
      ...cache.content,
      generated: cache.generated
    } as DynamicContent;
  } catch (error) {
    console.error('Error loading dynamic content:', error);
    return fallbackContent;
  }
}
