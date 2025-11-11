import cron from 'node-cron';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bulletproof error handling - keep scheduler alive no matter what
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception - scheduler will continue:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection - scheduler will continue:', reason);
});

console.log('🕐 Content scheduler started');
console.log('⏰ Will generate new content every 15 minutes');

// Run every 15 minutes
cron.schedule('*/15 * * * *', () => {
  console.log('\n⚡ Starting content generation...');

  const scriptPath = join(__dirname, 'generate-dynamic-content.js');

  try {
    exec(`node "${scriptPath}"`, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Generation failed:', error.message);
        console.error('Scheduler will continue running...');
        return;
      }
      if (stderr) {
        console.error('⚠️  Warning:', stderr);
      }
      console.log(stdout);
    });
  } catch (syncError) {
    console.error('❌ Failed to start generation:', syncError);
    console.error('Scheduler will continue running...');
  }
});

// Run immediately on startup
console.log('🚀 Running initial content generation...');
const scriptPath = join(__dirname, 'generate-dynamic-content.js');
try {
  exec(`node "${scriptPath}"`, { timeout: 120000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Initial generation failed:', error.message);
      console.error('Scheduler will continue running...');
      return;
    }
    if (stderr) {
      console.error('⚠️  Warning:', stderr);
    }
    console.log(stdout);
  });
} catch (syncError) {
  console.error('❌ Failed to start initial generation:', syncError);
  console.error('Scheduler will continue running...');
}

console.log('\n✓ Scheduler is running. Press Ctrl+C to stop.\n');
