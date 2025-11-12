import Parser from 'rss-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parser = new Parser();
const SUBSTACK_URL = 'https://prismaticalab.substack.com/feed';

// Helper function to convert HTML to structured content
function htmlToStructuredContent(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const content = [];

  // Get all meaningful elements (h1, h2, h3, p)
  const elements = doc.querySelectorAll('h1, h2, h3, h4, p');

  elements.forEach(el => {
    let text = el.textContent.trim();
    if (!text) return;

    // Skip button text and subscribe prompts
    if (text.toLowerCase().includes('subscribe now') ||
        text.toLowerCase().includes('leave a comment') ||
        text.toLowerCase().includes('share what') ||
        text.match(/^share$/i)) {
      return;
    }

    // Convert headings to heading blocks
    if (el.tagName.match(/^H[1-4]$/)) {
      content.push({
        type: 'heading',
        text: text
      });
    }
    // Convert paragraphs to paragraph blocks
    else if (el.tagName === 'P') {
      // Skip empty or very short paragraphs
      if (text.length < 10) return;

      content.push({
        type: 'paragraph',
        text: text
      });
    }
  });

  return content;
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper function to estimate read time
function estimateReadTime(content) {
  const wordCount = content.reduce((total, block) => {
    return total + block.text.split(/\s+/).length;
  }, 0);
  const minutes = Math.ceil(wordCount / 200); // Average reading speed
  return `${minutes} min read`;
}

// Helper function to extract first paragraph as excerpt
function extractExcerpt(content) {
  const firstParagraph = content.find(block => block.type === 'paragraph');
  if (!firstParagraph) return '';

  const text = firstParagraph.text;
  // Limit to ~150 characters
  if (text.length > 150) {
    return text.substring(0, 150).trim() + '...';
  }
  return text;
}

async function syncSubstackArticles() {
  console.log('📰 Fetching Substack RSS feed...');

  try {
    // Fetch Substack RSS feed
    const feed = await parser.parseURL(SUBSTACK_URL);
    console.log(`✓ Found ${feed.items.length} articles in feed`);

    // Load existing articles
    const articlesPath = join(__dirname, '..', 'public', 'data', 'articles.json');
    let existingData = { articles: [] };

    if (fs.existsSync(articlesPath)) {
      existingData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      console.log(`✓ Loaded ${existingData.articles.length} existing articles`);
    }

    // Get existing article IDs to avoid duplicates
    const existingIds = new Set(existingData.articles.map(a => a.id));

    let newArticlesCount = 0;

    // Process each Substack article
    for (const item of feed.items) {
      const slug = generateSlug(item.title);

      // Skip if already exists
      if (existingIds.has(slug)) {
        console.log(`⊘ Skipping existing article: ${item.title}`);
        continue;
      }

      console.log(`+ Processing new article: ${item.title}`);

      // Parse content - RSS parser stores content:encoded in contentEncoded
      const rawContent = item.contentEncoded || item['content:encoded'] || item.content || '';

      if (!rawContent) {
        console.log(`⚠ Skipping article with no content: ${item.title}`);
        continue;
      }

      const structuredContent = htmlToStructuredContent(rawContent);

      if (structuredContent.length === 0) {
        console.log(`⚠ Skipping article with empty parsed content: ${item.title}`);
        continue;
      }

      // Create article object
      const article = {
        id: slug,
        title: item.title,
        author: item.creator || 'Ray Tarantino',
        date: new Date(item.pubDate).toISOString().split('T')[0],
        excerpt: extractExcerpt(structuredContent),
        coverImage: `/images/articles/${slug}-cover.png`,
        coverImageCaption: '',
        readTime: estimateReadTime(structuredContent),
        tags: item.categories || [],
        content: structuredContent
      };

      // Add to beginning of array (newest first)
      existingData.articles.unshift(article);
      newArticlesCount++;
    }

    if (newArticlesCount > 0) {
      // Save updated articles
      fs.writeFileSync(articlesPath, JSON.stringify(existingData, null, 2));
      console.log(`\n✅ Successfully synced ${newArticlesCount} new article(s)`);
      console.log(`📊 Total articles: ${existingData.articles.length}`);
    } else {
      console.log('\n✓ No new articles to sync');
    }

  } catch (error) {
    console.error('❌ Error syncing Substack articles:', error);
    process.exit(1);
  }
}

// Run the sync
syncSubstackArticles();
