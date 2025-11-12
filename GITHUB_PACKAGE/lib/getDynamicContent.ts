import fs from 'fs';
import path from 'path';

interface DynamicContent {
  newsInsight: string;
  intelligenceExample: string;
  generated?: string;
}

const fallbackContent: DynamicContent = {
  newsInsight: "Notice how every CEO says they want innovation but hires for predictability? That's not contradiction. That's institutional self-preservation disguised as strategy.",
  intelligenceExample: "Unemployment hitting 5%, for example. We read that and our mind goes to: what industries are hardest hit, and what does that tell us about which skills are becoming obsolete?",
};

export async function getDynamicContent(): Promise<DynamicContent> {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'dynamic-content.json');

    if (!fs.existsSync(dataPath)) {
      return fallbackContent;
    }

    const cache = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Check if cache is still valid (70 minutes)
    const generated = new Date(cache.generated);
    const now = new Date();
    const ageInMinutes = (now.getTime() - generated.getTime()) / 60000;

    if (ageInMinutes > 70) {
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
