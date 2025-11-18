/**
 * Upload Athena's hierarchical knowledge base to Vercel Blob
 * Run: node scripts/upload-knowledge-to-blob.js
 */

import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'athena-knowledge-blob');

async function uploadKnowledgeFiles() {
  console.log('📚 Uploading Athena knowledge base to Vercel Blob...\n');

  try {
    // Get all JSON files recursively
    const files = getAllJsonFiles(KNOWLEDGE_DIR);

    console.log(`Found ${files.length} knowledge files to upload\n`);

    for (const filePath of files) {
      // Get relative path from knowledge dir
      const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
      const blobPath = `athena-knowledge/${relativePath}`;

      // Read file content
      const content = fs.readFileSync(filePath, 'utf-8');

      // Upload to Blob
      console.log(`⬆️  Uploading: ${blobPath}`);

      const blob = await put(blobPath, content, {
        access: 'public',
        addRandomSuffix: false,
        cacheControlMaxAge: 3600, // 1 hour cache
        contentType: 'application/json'
      });

      console.log(`   ✅ Uploaded: ${blob.url}\n`);
    }

    console.log('✨ All knowledge files uploaded successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Update getKnowledgeContext.ts to fetch from Blob');
    console.log('2. Update Athena core prompt with navigation instructions');
    console.log('3. Test the new knowledge system\n');

  } catch (error) {
    console.error('❌ Error uploading knowledge files:', error);
    process.exit(1);
  }
}

function getAllJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Run upload
uploadKnowledgeFiles();
