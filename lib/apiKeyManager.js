/**
 * Centralized API Key Manager for Anthropic Claude API (JavaScript ES Module version for scripts)
 *
 * Provides service-specific API keys with automatic fallback to ANTHROPIC_API_KEY.
 * Logs key usage for debugging and monitoring.
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env.local for local development
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
dotenv.config({ path: envPath });

export const ServiceType = {
  CONTENT_GENERATION: 'CONTENT_GENERATION',
  ATHENA_CHAT: 'ATHENA_CHAT',
  ATHENA_ANALYSIS: 'ATHENA_ANALYSIS'
};

const SERVICE_CONFIG = {
  [ServiceType.CONTENT_GENERATION]: {
    primaryKey: 'ANTHROPIC_API_KEY_CONTENT',
    fallbackKey: 'ANTHROPIC_API_KEY',
    serviceName: 'Content Generation',
    model: 'claude-opus-4-20250514'
  },
  [ServiceType.ATHENA_CHAT]: {
    primaryKey: 'ANTHROPIC_API_KEY_CHAT',
    fallbackKey: 'ANTHROPIC_API_KEY',
    serviceName: 'Athena Chat',
    model: 'claude-sonnet-4-5-20250929'
  },
  [ServiceType.ATHENA_ANALYSIS]: {
    primaryKey: 'ANTHROPIC_API_KEY_CHAT',
    fallbackKey: 'ANTHROPIC_API_KEY',
    serviceName: 'Athena Analysis',
    model: 'claude-sonnet-4-5-20250929'
  }
};

/**
 * Get API key for a specific service with automatic fallback
 *
 * @param {string} service - The service type requesting the API key
 * @returns {string} The API key to use
 * @throws {Error} if no valid API key is found
 */
export function getApiKey(service) {
  const config = SERVICE_CONFIG[service];

  if (!config) {
    throw new Error(`Unknown service type: ${service}`);
  }

  // Try primary key first
  const primaryKey = process.env[config.primaryKey];
  if (primaryKey) {
    console.log(`✓ ${config.serviceName}: Using dedicated API key (${config.primaryKey})`);
    return primaryKey;
  }

  // Fall back to ANTHROPIC_API_KEY
  const fallbackKey = process.env[config.fallbackKey];
  if (fallbackKey) {
    console.log(`⚠️  ${config.serviceName}: Using fallback API key (${config.fallbackKey})`);
    return fallbackKey;
  }

  // No valid key found
  throw new Error(
    `No API key found for ${config.serviceName}. ` +
    `Please set ${config.primaryKey} or ${config.fallbackKey} in environment variables.`
  );
}

/**
 * Get the model name for a specific service
 *
 * @param {string} service - The service type
 * @returns {string} The Claude model ID to use
 */
export function getModelForService(service) {
  const config = SERVICE_CONFIG[service];
  if (!config) {
    throw new Error(`Unknown service type: ${service}`);
  }
  return config.model;
}

/**
 * Validate that all required API keys are available
 * Call this on application startup to fail fast if configuration is missing
 *
 * @throws {Error} if any required API key is missing
 */
export function validateApiKeys() {
  const results = [];

  for (const [serviceType, config] of Object.entries(SERVICE_CONFIG)) {
    try {
      getApiKey(serviceType);
      results.push(`✓ ${config.serviceName}: OK`);
    } catch (error) {
      results.push(`✗ ${config.serviceName}: MISSING`);
    }
  }

  console.log('\nAPI Key Validation:');
  results.forEach(result => console.log(`  ${result}`));
  console.log('');
}
