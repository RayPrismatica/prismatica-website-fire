// BentoBox Content Parser Utilities
// Converts JSON content into renderable React elements

import type {
  BentoContent,
  DynamicData,
  BodyItem,
  MetadataContent,
  DynamicVariable
} from './types';

// ============================================================================
// Dynamic Variable Resolution
// ============================================================================

/**
 * Resolves a dynamic variable by calling the specified function
 * Currently supports: getDeliveryDate
 */
export function resolveDynamicVariable(
  variable: DynamicVariable,
  functions: Record<string, (...args: any[]) => any>
): string {
  const { function: funcName, args } = variable;

  if (functions[funcName]) {
    return functions[funcName](...args);
  }

  console.warn(`Function ${funcName} not found in function registry`);
  return `{${funcName}}`;
}

// ============================================================================
// Variable Substitution
// ============================================================================

/**
 * Replaces {placeholder} in text with actual values
 * Example: "Delivered by {deliveryDate}." → "Delivered by 15 March."
 */
export function substituteVariables(
  text: string,
  variables: Record<string, DynamicVariable> | undefined,
  functions: Record<string, (...args: any[]) => any>
): string {
  if (!variables) return text;

  let result = text;

  Object.entries(variables).forEach(([key, variable]) => {
    const value = resolveDynamicVariable(variable, functions);
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  });

  return result;
}

// ============================================================================
// Dynamic Content Resolution
// ============================================================================

/**
 * Resolves dynamic content from getDynamicContent() cache
 */
export function resolveDynamicContent(
  dynamicKey: string,
  dynamicData?: DynamicData,
  fallback?: string
): string {
  // If dynamic data exists and has the key, use it
  if (dynamicData && dynamicKey in dynamicData && dynamicData[dynamicKey]) {
    return dynamicData[dynamicKey];
  }

  // Use fallback if provided
  if (fallback) {
    return fallback;
  }

  // Last resort: show missing key
  console.warn(`Dynamic content key not found and no fallback: ${dynamicKey}`);
  return `[Missing: ${dynamicKey}]`;
}

// ============================================================================
// Body Content Parser
// ============================================================================

/**
 * Parses body items (array of paragraphs)
 * Returns array of strings (text content)
 */
export function parseBodyContent(
  bodyItems: BodyItem[] | undefined,
  dynamicData?: DynamicData
): string[] {
  if (!bodyItems || bodyItems.length === 0) {
    return [];
  }

  return bodyItems.map(item => {
    if (item.type === 'dynamic') {
      const key = item.field || item.dynamicKey;
      if (key) {
        return resolveDynamicContent(key, dynamicData, item.fallback);
      }
    }
    return item.text || '';
  });
}

// ============================================================================
// Metadata Content Parser
// ============================================================================

/**
 * Parses metadata content (timeline/duration)
 * Handles variable substitution
 */
export function parseMetadataContent(
  metadata: MetadataContent | undefined,
  dynamicData: DynamicData | undefined,
  functions: Record<string, (...args: any[]) => any>
): string | null {
  if (!metadata) return null;

  if (metadata.type === 'function' && metadata.function && metadata.template) {
    // Call the function with args
    const result = functions[metadata.function]
      ? functions[metadata.function](...(metadata.args || []))
      : `[${metadata.function}]`;
    // Substitute {result} in the template
    return metadata.template.replace(/\{result\}/g, result);
  }

  if (metadata.type === 'dynamic' && metadata.dynamicKey) {
    return resolveDynamicContent(metadata.dynamicKey, dynamicData);
  }

  if (metadata.type === 'static' && metadata.text) {
    return substituteVariables(metadata.text, metadata.variables, functions);
  }

  return null;
}

// ============================================================================
// Prompt Content Parser
// ============================================================================

/**
 * Parses prompt content (problem statement with red accent)
 */
export function parsePromptContent(
  prompt: BentoContent['content']['prompt'],
  dynamicData?: DynamicData
): string | null {
  if (!prompt) return null;

  if (prompt.type === 'dynamic' && prompt.dynamicKey) {
    return resolveDynamicContent(prompt.dynamicKey, dynamicData);
  }

  return prompt.text || null;
}

// ============================================================================
// Email Template Parser
// ============================================================================

/**
 * Parses email templates (share action)
 * Replaces {variables} with actual content
 */
export function parseEmailTemplate(
  template: string,
  content: BentoContent,
  currentUrl: string
): string {
  const firstParagraph = content.content.body?.[0]?.text || '';
  const price = content.footer?.type === 'price-cta' ? content.footer.price : '';
  const timeline = content.content.metadata?.text || '';

  return template
    .replace(/\{title\}/g, content.content.title)
    .replace(/\{description\}/g, firstParagraph)
    .replace(/\{price\}/g, price)
    .replace(/\{timeline\}/g, timeline)
    .replace(/\{url\}/g, currentUrl);
}

// ============================================================================
// Content Validator
// ============================================================================

/**
 * Validates bento content has required fields
 * Returns validation errors or null if valid
 */
export function validateBentoContent(content: BentoContent): string[] | null {
  const errors: string[] = [];

  // Required fields
  if (!content.id) {
    errors.push('Missing required field: id');
  }

  if (!content.variant) {
    errors.push('Missing required field: variant');
  }

  if (!content.content?.title) {
    errors.push('Missing required field: content.title');
  }

  // Variant-specific validation
  if (content.variant === 'service' && !content.footer?.type) {
    console.warn(`Service bento "${content.id}" should have a footer with price`);
  }

  if (content.variant === 'link' && !content.actions?.link?.enabled) {
    console.warn(`Link bento "${content.id}" should have a link action enabled`);
  }

  return errors.length > 0 ? errors : null;
}

// ============================================================================
// Share Email URL Builder
// ============================================================================

/**
 * Builds a mailto: URL from share action config
 */
export function buildShareEmailUrl(
  subject: string,
  body: string
): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
}
