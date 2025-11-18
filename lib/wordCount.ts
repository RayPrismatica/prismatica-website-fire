/**
 * Word counting utilities for reading engagement tracking
 */

/**
 * Counts the number of words in a given text string
 * Filters out empty strings and whitespace
 *
 * @param text - The text content to count words in
 * @returns The number of words
 */
export function countWords(text: string): number {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;
}

/**
 * Estimates the time needed to read content at average reading speed
 * Assumes 225 words per minute (WPM) average reading speed
 *
 * @param wordCount - Number of words in the content
 * @returns Estimated read time in seconds
 */
export function getEstimatedReadTime(wordCount: number): number {
  if (wordCount <= 0) {
    return 0;
  }

  // 225 words per minute = 3.75 words per second
  // Read time in seconds = wordCount / 3.75
  return Math.ceil((wordCount / 225) * 60);
}

/**
 * Classifies engagement level based on actual time spent vs expected read time
 *
 * @param duration - Actual time spent in seconds
 * @param wordCount - Number of words in the content
 * @returns Engagement classification
 */
export function classifyEngagement(
  duration: number,
  wordCount: number
): 'skimmed' | 'viewed' | 'read' | 'engaged' {
  // Handle edge cases
  if (duration <= 0 || wordCount <= 0) {
    return 'skimmed';
  }

  // Calculate minimum expected read time (with 20% buffer for comfortable reading)
  const minimumReadTime = getEstimatedReadTime(wordCount) * 1.2;

  // Classify based on percentage of expected time spent
  if (duration < minimumReadTime * 0.3) {
    return 'skimmed'; // Less than 30% of expected time
  }

  if (duration < minimumReadTime * 0.8) {
    return 'viewed'; // 30-80% of expected time
  }

  if (duration < minimumReadTime * 1.2) {
    return 'read'; // 80-120% of expected time - actually read it
  }

  return 'engaged'; // Over 120% - deep focus, re-reading, or careful consideration
}

/**
 * Formats duration in a human-readable way
 *
 * @param seconds - Duration in seconds
 * @returns Formatted string like "45s" or "2m 30s"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}
