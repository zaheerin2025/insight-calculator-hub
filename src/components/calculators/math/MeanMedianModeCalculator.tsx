
import React, { useState } from 'react';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { Calculator } from 'lucide-react';

const MeanMedianModeCalculator: React.FC = () => {
  const [dataInput, setDataInput] = useState<string>('');
  const [results, setResults] = useState<{
    mean: number | null;
    median: number | null;
    mode: number[] | null;
    count: number;
    sum: number;
    min: number | null;
    max: number | null;
    range: number | null;
  } | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Parse input data to an array of numbers
  const parseData = (input: string): number[] => {
    // Split by common separators
    const values = input.split(/[\s,;]+/);
    const numbers: number[] = [];
    
    for (const value of values) {
      if (value.trim() === '') continue;
      
      const num = parseFloat(value);
      if (isNaN(num)) {
        throw new Error(`Invalid number: "${value}"`);
      }
      numbers.push(num);
    }
    
    return numbers;
  };

  // Calculate mean (average)
  const calculateMean = (data: number[]): number => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };

  // Calculate median
  const calculateMedian = (data: number[]): number => {
    if (data.length === 0) return 0;
    
    const sortedData = [...data].sort((a, b) => a - b);
    const midIndex = Math.floor(sortedData.length / 2);
    
    if (sortedData.length % 2 === 0) {
      // For even number of elements, take average of middle two
      return (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
    } else {
      // For odd number of elements, take the middle one
      return sortedData[midIndex];
    }
  };

  // Calculate mode (most frequent values)
  const calculateMode = (data: number[]): number[] => {
    if (data.length === 0) return [];
    
    // Count frequencies
    const frequencyMap: Record<number, number> = {};
    for (const value of data) {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    }
    
    // Find the highest frequency
    let maxFrequency = 0;
    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        maxFrequency = frequencyMap[key];
      }
    }
    
    // If all values appear the same number of times, there's no mode
    if (maxFrequency === 1) {
      return [];
    }
    
    // Find all values with the highest frequency
    const mode: number[] = [];
    for (const key in frequencyMap) {
      if (frequencyMap[key] === maxFrequency) {
        mode.push(parseFloat(key));
      }
    }
    
    return mode.sort((a, b) => a - b);
  };

  const calculateStatistics = () => {
    try {
      setError(null);
      const data = parseData(dataInput);
      
      if (data.length === 0) {
        setError("Please enter at least one valid number");
        setIsCalculated(false);
        return;
      }
      
      const mean = calculateMean(data);
      const median = calculateMedian(data);
      const mode = calculateMode(data);
      const sum = data.reduce((acc, val) => acc + val, 0);
      const min = Math.min(...data);
      const max = Math.max(...data);
      
      setResults({
        mean,
        median,
        mode: mode.length > 0 ? mode : null,
        count: data.length,
        sum,
        min,
        max,
        range: max - min
      });
      
      setIsCalculated(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsCalculated(false);
    }
  };

  const formatNumberArray = (arr: number[] | null): string => {
    if (!arr || arr.length === 0) return "No mode (all values appear equally)";
    return arr.join(", ");
  };

  return (
    <CalculatorLayout
      title="Mean, Median, Mode Calculator"
      description="Calculate statistical measures including mean, median, and mode from a data set."
      intro="Our statistics calculator helps you analyze your data set by computing the mean (average), median (middle value), mode (most frequent value), and other key statistical measures."
      formula={
        <>
          <h3 className="font-semibold">Mean (Average)</h3>
          <p className="mt-2">The mean is the average of all values in a data set, calculated by summing all values and dividing by the count of values.</p>
          <p className="mt-2 p-2 bg-muted/50 font-mono text-center">
            Mean = (x₁ + x₂ + ... + xₙ) / n
          </p>
          
          <h3 className="font-semibold mt-4">Median</h3>
          <p className="mt-2">The median is the middle value of a sorted data set.</p>
          <p className="mt-2">For an odd number of values, it's the middle value.</p>
          <p className="mt-2">For an even number of values, it's the average of the two middle values.</p>
          
          <h3 className="font-semibold mt-4">Mode</h3>
          <p className="mt-2">The mode is the most frequently occurring value(s) in a data set. A data set can have one mode, multiple modes, or no mode if all values occur with equal frequency.</p>
        </>
      }
      faq={[
        {
          question: "What is the difference between mean, median, and mode?",
          answer: "Mean is the average of all values. Median is the middle value when data is arranged in order. Mode is the most frequently occurring value(s). They represent different ways to find the 'center' of a data set."
        },
        {
          question: "When should I use mean vs median?",
          answer: "Mean is useful for normally distributed data but is sensitive to outliers. Median is better for skewed distributions or when outliers are present, as it represents the middle value regardless of extreme values."
        },
        {
          question: "Can a data set have more than one mode?",
          answer: "Yes! A data set with two modes is called 'bimodal,' and one with more than two modes is 'multimodal.' If all values occur with the same frequency, there is no mode."
        },
        {
          question: "What is range in statistics?",
          answer: "Range is a measure of dispersion that represents the difference between the maximum and minimum values in a data set. It gives a simple indication of how spread out the values are."
        }
      ]}
      relatedCalculators={[
        {
          title: "Percentage Calculator",
          path: "/calculators/math/percentage-calculator"
        },
        {
          title: "Square Root Calculator",
          path: "/calculators/math/square-root-calculator"
        }
      ]}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="data-input" className="mb-2 block">Enter Data Values</Label>
          <Textarea 
            id="data-input"
            placeholder="Enter numbers separated by spaces, commas, or line breaks (e.g., 5, 10, 15, 20, 25)"
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            className="h-32"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Enter a list of numbers separated by spaces, commas, or line breaks.
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-md p-3 text-sm">
            {error}
          </div>
        )}

        <Button 
          onClick={calculateStatistics} 
          className="w-full"
        >
          <Calculator className="mr-2" />
          Calculate Statistics
        </Button>

        {isCalculated && results && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultDisplay
                label="Mean (Average)"
                value={results.mean !== null ? results.mean.toFixed(4) : "N/A"}
                icon={<Calculator className="h-5 w-5 text-primary" />}
                isHighlighted
              />
              
              <ResultDisplay
                label="Median (Middle)"
                value={results.median !== null ? results.median.toFixed(4) : "N/A"}
                icon={<Calculator className="h-5 w-5 text-primary" />}
                isHighlighted
              />
            </div>
            
            <ResultDisplay
              label="Mode (Most Frequent)"
              value={results.mode ? formatNumberArray(results.mode) : "No mode (all values appear equally)"}
              icon={<Calculator className="h-5 w-5 text-primary" />}
              isHighlighted
            />
            
            <div className="grid grid-cols-2 gap-4">
              <ResultDisplay
                label="Count"
                value={results.count.toString()}
                icon={<Calculator className="h-5 w-5 text-primary" />}
              />
              
              <ResultDisplay
                label="Sum"
                value={results.sum.toFixed(2)}
                icon={<Calculator className="h-5 w-5 text-primary" />}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <ResultDisplay
                label="Minimum"
                value={results.min !== null ? results.min.toString() : "N/A"}
                icon={<Calculator className="h-5 w-5 text-primary" />}
              />
              
              <ResultDisplay
                label="Maximum"
                value={results.max !== null ? results.max.toString() : "N/A"}
                icon={<Calculator className="h-5 w-5 text-primary" />}
              />
              
              <ResultDisplay
                label="Range"
                value={results.range !== null ? results.range.toString() : "N/A"}
                icon={<Calculator className="h-5 w-5 text-primary" />}
              />
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default MeanMedianModeCalculator;
