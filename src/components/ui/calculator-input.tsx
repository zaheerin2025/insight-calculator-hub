
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CalculatorInputProps {
  id: string;
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  min,
  max,
  step,
  className = '',
  prefix,
  suffix,
  disabled = false,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-muted-foreground">{prefix}</span>
          </div>
        )}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
          disabled={disabled}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-muted-foreground">{suffix}</span>
          </div>
        )}
      </div>
      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
};

export default CalculatorInput;
