
import React from 'react';
import { cn } from '@/lib/utils';

export interface ResultDisplayProps {
  label?: string;
  title?: string; // Added for backward compatibility
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  highlight?: boolean; // Added for backward compatibility
  description?: string; // Added for backward compatibility
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  title, // Support both label and title
  value,
  icon,
  className,
  isHighlighted = false,
  highlight = false, // Support both isHighlighted and highlight
  description
}) => {
  // Use label if provided, otherwise fall back to title
  const displayLabel = label || title;
  // Use isHighlighted if provided, otherwise fall back to highlight
  const isHighlightedFinal = isHighlighted || highlight;
  
  return (
    <div
      className={cn(
        'flex items-center p-4 rounded-lg border',
        isHighlightedFinal
          ? 'bg-primary/5 border-primary/20'
          : 'bg-muted/30 border-muted',
        className
      )}
    >
      {icon && (
        <div className="mr-3 p-2 bg-muted rounded-md">
          {icon}
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-1">{displayLabel}</div>
        <div className="text-lg font-semibold">{value}</div>
        {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
      </div>
    </div>
  );
};

export default ResultDisplay;
