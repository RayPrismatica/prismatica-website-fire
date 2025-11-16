// BentoBox Component - Main Exports

// Original component (JSX-based)
export { default } from './BentoBox';
export type { BentoBoxProps } from './BentoBox';

// Content-driven component (JSON-based)
export { default as BentoBoxFromContent } from './BentoBoxFromContent';

// Wrapper components for simplified page usage
export { ConsultingBentoWrapper, ConsultingBentoProvider } from './ConsultingBentoWrapper';

// Types for content schema
export type {
  BentoContent,
  BentoVariant,
  ContentType,
  BodyItem,
  BentoBoxFromContentProps,
  DynamicData
} from './types';

// Content parser utilities (for advanced usage)
export {
  parseBodyContent,
  parsePromptContent,
  parseMetadataContent,
  parseEmailTemplate,
  validateBentoContent,
  buildShareEmailUrl
} from './contentParser';
