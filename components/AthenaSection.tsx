'use client';

import { ReactNode } from 'react';

interface AthenaSectionProps {
  prompt: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Wrapper component that makes any section responsive to Athena's contextual prompts.
 * When this section is in view, Athena's bottom sheet will show the specified prompt.
 *
 * Usage:
 * <AthenaSection prompt="Want to see how this applies to your industry?">
 *   <div>Your content here</div>
 * </AthenaSection>
 */
export default function AthenaSection({ prompt, children, className = '', style = {}, ...props }: AthenaSectionProps) {
  return (
    <div
      data-athena-prompt={prompt}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
