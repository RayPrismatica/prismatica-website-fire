import { readFileSync } from 'fs';
import { join } from 'path';

interface EngagementData {
  id: string;
  engagement: 'skimmed' | 'viewed' | 'read' | 'engaged';
  duration: number;
  wordCount: number;
  firstViewed: number;
  lastViewed: number;
}

interface ViewingContext {
  currentPage: string;
  pagesVisited: string[];
  modalsOpened: EngagementData[];
  sectionsViewed: EngagementData[];
}

/**
 * Maps route paths to knowledge file names
 */
const PAGE_KNOWLEDGE_MAP: { [key: string]: string } = {
  '/': 'homepage.md',
  '/solutions': 'solutions.md',
  '/products': 'products.md',
  '/about': 'about.md',
  '/contact': 'contact.md',
  '/articles': 'articles.md',
  '/demand': 'demand.md',
  '/incentives': 'incentives.md',
  '/agentic': 'agentic.md',
  '/prismatic': 'prismatic.md',
  '/triptych': 'triptych.md',
  'not-found': 'not-found.md' // Special key for 404 pages
};

/**
 * Loads a knowledge file from the filesystem
 * Returns the content or null if file doesn't exist
 */
function loadKnowledgeFile(type: 'pages' | 'modals', filename: string): string | null {
  try {
    const filePath = join(process.cwd(), 'athena', 'knowledge', type, filename);
    return readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`Knowledge file not found: ${type}/${filename}`);
    return null;
  }
}

/**
 * Generates contextual knowledge based on user's viewing history
 *
 * @param viewingContext - Object containing current page, visited pages, and opened modals
 * @returns Formatted markdown string with relevant knowledge
 */
export function getKnowledgeContext(viewingContext: ViewingContext): string {
  const sections: string[] = [];

  // Add header
  sections.push('# USER VIEWING CONTEXT\n');
  sections.push('The user has visited the following pages and opened the following modals. Use this context to provide more relevant responses.\n');

  // Current page
  sections.push(`## Current Page: ${viewingContext.currentPage}\n`);

  // Check if current page is in the map, or if it's a 404 (not in known routes)
  let currentPageFile = PAGE_KNOWLEDGE_MAP[viewingContext.currentPage];

  // If page not found in map, treat as 404
  if (!currentPageFile && !viewingContext.currentPage.match(/^\/(solutions|products|about|contact|articles|demand|incentives|agentic|prismatic|triptych|terms|privacy|test-mobile|bento-test|about-test)$/)) {
    currentPageFile = PAGE_KNOWLEDGE_MAP['not-found'];
    sections.push('*(User landed on a 404 page - they saw the complete site architecture)*\n\n');
  }

  if (currentPageFile) {
    const content = loadKnowledgeFile('pages', currentPageFile);
    if (content) {
      sections.push(content);
      sections.push('\n---\n');
    }
  }

  // Previously visited pages (excluding current)
  const previousPages = viewingContext.pagesVisited.filter(
    page => page !== viewingContext.currentPage
  );

  if (previousPages.length > 0) {
    sections.push('## Previously Visited Pages\n');

    for (const page of previousPages) {
      let pageFile = PAGE_KNOWLEDGE_MAP[page];

      // If page not found in map, treat as 404
      if (!pageFile && !page.match(/^\/(solutions|products|about|contact|articles|demand|incentives|agentic|prismatic|triptych|terms|privacy|test-mobile|bento-test|about-test)$/)) {
        pageFile = PAGE_KNOWLEDGE_MAP['not-found'];
        sections.push(`### ${page} *(404 page)*\n`);
      } else {
        sections.push(`### ${page}\n`);
      }

      if (pageFile) {
        const content = loadKnowledgeFile('pages', pageFile);
        if (content) {
          sections.push(content);
          sections.push('\n---\n');
        }
      }
    }
  }

  // Opened modals (with engagement data)
  if (viewingContext.modalsOpened.length > 0) {
    sections.push('## Modals Opened by User (with Reading Engagement)\n');
    sections.push('The user has opened the following modals. Engagement levels show HOW they interacted:\n\n');

    for (const engagement of viewingContext.modalsOpened) {
      sections.push(`### ${engagement.id} (${engagement.engagement}, ${engagement.duration}s / ${engagement.wordCount} words)\n`);

      const modalFile = `${engagement.id}.md`;
      const content = loadKnowledgeFile('modals', modalFile);
      if (content) {
        sections.push(content);
        sections.push('\n---\n');
      }
    }
  }

  // Sections viewed (scroll tracking with engagement data)
  if (viewingContext.sectionsViewed.length > 0) {
    sections.push('## Sections Viewed (with Reading Engagement)\n');
    sections.push('The user has scrolled past the following sections. Engagement levels show HOW they interacted:\n\n');

    // Group sections by page for cleaner presentation
    const sectionsByPage: { [page: string]: EngagementData[] } = {};
    viewingContext.sectionsViewed.forEach(engagement => {
      const [page] = engagement.id.split(':');
      if (!sectionsByPage[page]) {
        sectionsByPage[page] = [];
      }
      sectionsByPage[page].push(engagement);
    });

    for (const [page, engagements] of Object.entries(sectionsByPage)) {
      sections.push(`### ${page}\n`);
      engagements.forEach(eng => {
        const [, sectionName] = eng.id.split(':');
        sections.push(`- ${sectionName} (${eng.engagement}, ${eng.duration}s / ${eng.wordCount} words)\n`);
      });
      sections.push('\n');
    }
    sections.push('---\n');
  }

  // If no knowledge was loaded, return minimal context
  if (sections.length <= 2) {
    return `# USER VIEWING CONTEXT\n\nCurrent page: ${viewingContext.currentPage}\nPages visited: ${viewingContext.pagesVisited.join(', ')}\n`;
  }

  return sections.join('\n');
}
