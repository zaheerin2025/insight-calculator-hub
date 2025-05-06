
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ResultDisplayProps {
  title: string;
  value: string | number;
  description?: string;
  isLoading?: boolean;
  highlight?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  title,
  value,
  description,
  isLoading = false,
  highlight = false,
}) => {
  return (
    <Card className={`${highlight ? 'border-primary border-2' : 'border border-border'}`}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
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
