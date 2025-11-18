// BentoBox Content Schema TypeScript Types

export type ContentType = 'static' | 'dynamic';
export type BentoVariant = 'service' | 'link' | 'product';
export type FooterType = 'price-cta' | 'custom';
export type BodyItemType = 'text' | 'dynamic';

// ============================================================================
// Delivery Mode Types (Capabilities Consolidation)
// ============================================================================

export type DeliveryModeType = 'consulting' | 'ai-product' | 'framework';
export type DeliveryModeIcon = 'consultant' | 'ai' | 'framework';

export interface DeliveryModeCTA {
  text: string; // Button text
  action: 'enquire' | 'link' | 'external';
  modalId?: string; // For enquire action
  href?: string; // For link/external action
}

export interface DeliveryMode {
  type: DeliveryModeType;
  available: boolean;
  icon: DeliveryModeIcon;
  label: string; // Tooltip text for accessibility
  pricing?: string; // Optional pricing display (AI/framework only)
  productId?: string; // Link to product detail page
  cta: DeliveryModeCTA; // Call-to-action configuration
}

// ============================================================================
// Content Structures
// ============================================================================

export interface PromptContent {
  type: ContentType;
  text: string;
  dynamicKey?: string;
}

export interface BodyItem {
  type: BodyItemType;
  text?: string;
  dynamicKey?: string;
  field?: string; // Alias for dynamicKey
  fallback?: string; // Fallback text when dynamic content is missing
}

export interface DynamicVariable {
  type: 'dynamic';
  function: string;
  args: string[];
}

export interface MetadataContent {
  type: ContentType | 'function';
  text?: string;
  dynamicKey?: string;
  variables?: Record<string, DynamicVariable>;
  function?: string;
  args?: any[];
  template?: string;
}

export interface ContentFields {
  prompt?: PromptContent;
  title: string;
  badge?: string;
  body?: BodyItem[];
  metadata?: MetadataContent;
}

// ============================================================================
// Footer Structures
// ============================================================================

export interface PriceCTAFooter {
  type: 'price-cta';
  price: string;
}

export interface CustomFooter {
  type: 'custom';
  primaryText: string;
  secondaryText?: string;
  linkButton?: {
    text: string;
    href: string;
    style?: 'primary' | 'secondary';
  };
  note?: string;
}

export type FooterContent = PriceCTAFooter | CustomFooter;

// ============================================================================
// Actions
// ============================================================================

export interface ShareAction {
  enabled: boolean;
  subject?: string;
  body?: string;
}

export interface EnquireAction {
  enabled: boolean;
  modalId?: string;
  buttonText?: string;
}

export interface LinkAction {
  enabled: boolean;
  href?: string;
  text?: string;
  target?: '_self' | '_blank';
}

export interface CustomAction {
  enabled: boolean;
  type?: 'function';
  handler?: string;
  label?: string;
}

export interface Actions {
  share?: ShareAction;
  enquire?: EnquireAction;
  link?: LinkAction;
  custom?: CustomAction;
}

// ============================================================================
// Metadata
// ============================================================================

export interface BentoMetadata {
  created?: string;
  lastUpdated?: string;
  author?: string;
  notes?: string;
}

// ============================================================================
// Style Overrides
// ============================================================================

export interface StyleOverrides {
  border?: string;
  padding?: string;
  backgroundColor?: string;
  [key: string]: string | undefined;
}

// ============================================================================
// Service Configuration (for consulting services)
// ============================================================================

export interface ServiceConfig {
  durationWeeks: number;
  bufferWeeks?: number;
  basePrice: number;
}

// ============================================================================
// Complete Bento Content Schema
// ============================================================================

export interface BentoContent {
  id: string;
  variant: BentoVariant;
  enabled?: boolean;
  deliveryModes?: DeliveryMode[];
  metadata?: BentoMetadata;
  content: ContentFields;
  footer?: FooterContent;
  actions?: Actions;
  style?: StyleOverrides;
  service?: ServiceConfig;
  athenaPrompt?: string;
}

// ============================================================================
// Dynamic Data (from getDynamicContent)
// ============================================================================

export interface DynamicData {
  [key: string]: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface BentoBoxFromContentProps {
  content: BentoContent;
  dynamicData?: DynamicData;
  functionRegistry?: Record<string, (...args: any[]) => any>;
  onEnquire?: (modalId: string) => void;
  className?: string;
}
