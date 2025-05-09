
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import ResultDisplay from '@/components/calculators/ResultDisplay';
import { ArrowRightLeft } from 'lucide-react';

// Unit conversion constants
const UNITS = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176,
    cup: 0.236588,
    tablespoon: 0.0147868,
    teaspoon: 0.00492892
  },
  temperature: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K'
  },
  area: {
    squareMeter: 1,
    squareKilometer: 1000000,
    squareCentimeter: 0.0001,
    squareMillimeter: 0.000001,
    squareMile: 2590000,
    acre: 4046.86,
    hectare: 10000,
    squareYard: 0.836127,
    squareFoot: 0.092903,
    squareInch: 0.00064516
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2629800, // average month (365.25/12 days)
    year: 31557600 // 365.25 days
  }
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<string>('length');
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Get available units for the current category
  const getUnitsForCategory = (cat: string) => {
    return Object.keys(UNITS[cat as keyof typeof UNITS]);
  };

  const handleConvert = () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setResult('Please enter a valid number');
      setShowResult(true);
      return;
    }

    const input = parseFloat(inputValue);
    let convertedValue: number | string;

    // Special handling for temperature conversions
    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = (input * 9/5) + 32;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedValue = input + 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = (input - 32) * 5/9;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedValue = (input - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedValue = input - 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedValue = (input - 273.15) * 9/5 + 32;
      } else {
        // Same unit conversion
        convertedValue = input;
      }
    } else {
      // For other units, use the conversion factors
      const units = UNITS[category as keyof typeof UNITS];
      const fromFactor = units[fromUnit as keyof typeof units];
      const toFactor = units[toUnit as keyof typeof units];
      convertedValue = (input * (fromFactor as number)) / (toFactor as number);
    }

    // Format result based on size
    if (typeof convertedValue === 'number') {
      if (Math.abs(convertedValue) >= 1000 || Math.abs(convertedValue) < 0.001) {
        convertedValue = convertedValue.toExponential(6);
      } else {
        convertedValue = parseFloat(convertedValue.toFixed(6)).toString();
      }
    }

    setResult(`${input} ${fromUnit} = ${convertedValue} ${toUnit}`);
    setShowResult(true);
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (showResult) {
      handleConvert();
    }
  };

  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert between various units of measurement including length, weight, volume, temperature, area, and time."
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Unit Converter</CardTitle>
          <CardDescription>
            Select a category and units to convert between different measurements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="length" onValueChange={(value) => {
            setCategory(value);
            // Reset units for the new category
            const units = getUnitsForCategory(value);
            setFromUnit(units[0]);
            setToUnit(units[1]);
            setShowResult(false);
          }}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="length">Length</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="temperature">Temp</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
            </TabsList>

            {Object.keys(UNITS).map((cat) => (
              <TabsContent key={cat} value={cat} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inputValue">Value</Label>
                    <Input
                      id="inputValue"
                      type="number"
                      placeholder="Enter value"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowResult(false);
                      }}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full">
                      <Label htmlFor="fromUnit">From</Label>
                      <Select
                        value={fromUnit}
                        onValueChange={(value) => {
                          setFromUnit(value);
                          setShowResult(false);
                        }}
                      >
                        <SelectTrigger id="fromUnit" className="mt-1">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {getUnitsForCategory(category).map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handleSwapUnits}
                        className="rounded-full p-2 hover:bg-muted transition-colors"
                        aria-label="Swap units"
                      >
                        <ArrowRightLeft className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="w-full">
                      <Label htmlFor="toUnit">To</Label>
                      <Select
                        value={toUnit}
                        onValueChange={(value) => {
                          setToUnit(value);
                          setShowResult(false);
                        }}
                      >
                        <SelectTrigger id="toUnit" className="mt-1">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {getUnitsForCategory(category).map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={handleConvert}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Convert
                    </button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {showResult && result && (
            <ResultDisplay title="Conversion Result">
              <p className="text-lg font-medium text-center">{result}</p>
            </ResultDisplay>
          )}
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default UnitConverter;
