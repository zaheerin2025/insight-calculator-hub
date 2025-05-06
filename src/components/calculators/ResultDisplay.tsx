
import React from 'react';
import { cn } from '@/lib/utils';

export interface ResultDisplayProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  icon,
  className,
  isHighlighted = false
}) => {
  return (
    <div
      className={cn(
        'flex items-center p-4 rounded-lg border',
        isHighlighted
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
        <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default ResultDisplay;
