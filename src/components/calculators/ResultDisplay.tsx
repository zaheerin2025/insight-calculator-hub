
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ResultDisplayProps {
  title?: string;
  label?: string;  // Added label prop
  value: string | number;
  description?: string;
  isLoading?: boolean;
  highlight?: boolean;
  icon?: React.ReactNode; // Added icon prop
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  title,
  label,  // Added label prop
  value,
  description,
  isLoading = false,
  highlight = false,
  icon,   // Added icon prop
}) => {
  // Use label if provided, otherwise fall back to title
  const displayTitle = label || title;
  
  return (
    <Card className={`${highlight ? 'border-primary border-2' : 'border border-border'}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="text-sm font-medium text-muted-foreground">{displayTitle}</h3>
        </div>
        {isLoading ? (
          <div className="h-8 bg-muted animate-pulse rounded-md mt-1"></div>
        ) : (
          <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-primary' : ''}`}>
            {value}
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
