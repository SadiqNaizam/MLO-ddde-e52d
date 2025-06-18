import React from 'react';
import { cn } from '@/lib/utils'; // Assumes cn utility from shadcn/ui setup

interface GlassmorphicPanelProps {
  children: React.ReactNode;
  className?: string;
}

const GlassmorphicPanel: React.FC<GlassmorphicPanelProps> = ({ children, className }) => {
  console.log('GlassmorphicPanel loaded');

  return (
    <div
      className={cn(
        'bg-slate-800/60', // Semi-transparent dark background (charcoal/navy tint)
        'backdrop-blur-xl',    // Strong frosted glass effect
        'p-6',                 // Default padding
        'rounded-2xl',         // Softer, more premium rounded corners
        'border',              // Enable border
        'border-slate-200/10', // Subtle light border to catch light and add definition
        'shadow-2xl',          // Pronounced shadow for depth
        className              // Allow custom classes to override or extend
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphicPanel;