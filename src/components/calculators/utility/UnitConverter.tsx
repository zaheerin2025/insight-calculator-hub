
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Wrench, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Conversion types
type ConversionCategory = 'length' | 'weight' | 'volume' | 'temperature' | 'area';

// Conversion unit options
const conversionUnits = {
  length: [
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'm', label: 'Meters (m)' },
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'in', label: 'Inches (in)' },
    { value: 'ft', label: 'Feet (ft)' },
    { value: 'yd', label: 'Yards (yd)' },
    { value: 'mi', label: 'Miles (mi)' }
  ],
  weight: [
    { value: 'mg', label: 'Milligrams (mg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'st', label: 'Stone (st)' },
    { value: 't', label: 'Metric Tons (t)' }
  ],
  volume: [
    { value: 'ml', label: 'Milliliters (ml)' },
    { value: 'l', label: 'Liters (l)' },
    { value: 'c', label: 'Cups (c)' },
    { value: 'pt', label: 'Pints (pt)' },
    { value: 'qt', label: 'Quarts (qt)' },
    { value: 'gal', label: 'Gallons (gal)' },
    { value: 'floz', label: 'Fluid Ounces (fl oz)' },
    { value: 'cu_ft', label: 'Cubic Feet (cu ft)' },
    { value: 'cu_m', label: 'Cubic Meters (cu m)' }
  ],
  temperature: [
    { value: 'c', label: 'Celsius (°C)' },
    { value: 'f', label: 'Fahrenheit (°F)' },
    { value: 'k', label: 'Kelvin (K)' }
  ],
  area: [
    { value: 'sq_m', label: 'Square Meters (m²)' },
    { value: 'sq_km', label: 'Square Kilometers (km²)' },
    { value: 'sq_ft', label: 'Square Feet (ft²)' },
    { value: 'sq_yd', label: 'Square Yards (yd²)' },
    { value: 'acre', label: 'Acres' },
    { value: 'ha', label: 'Hectares (ha)' },
    { value: 'sq_mi', label: 'Square Miles (mi²)' }
  ]
};

// Conversion factors - all relative to base unit for each category
// Base units: m (length), g (weight), l (volume), c (temperature), sq_m (area)
const conversionFactors = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
    st: 6350.29,
    t: 1000000
  },
  volume: {
    ml: 0.001,
    l: 1,
    c: 0.236588,
    pt: 0.473176,
    qt: 0.946353,
    gal: 3.78541,
    floz: 0.0295735,
    cu_ft: 28.3168,
    cu_m: 1000
  },
  area: {
    sq_m: 1,
    sq_km: 1000000,
    sq_ft: 0.092903,
    sq_yd: 0.836127,
    acre: 4046.86,
    ha: 10000,
    sq_mi: 2589988.11
  }
};

const UnitConverter: React.FC = () => {
  // State for each conversion tab
  const [category, setCategory] = useState<ConversionCategory>('length');
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>(conversionUnits[category][0].value);
  const [toUnit, setToUnit] = useState<string>(conversionUnits[category][1].value);
  
  // Handle category change
  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    setFromUnit(conversionUnits[newCategory][0].value);
    setToUnit(conversionUnits[newCategory][1].value);
  };
  
  // Calculate conversion
  const convertedValue = useMemo(() => {
    // Special case for temperature which doesn't use simple multiplication
    if (category === 'temperature') {
      if (fromUnit === 'c' && toUnit === 'f') {
        return (inputValue * 9/5) + 32;
      } else if (fromUnit === 'c' && toUnit === 'k') {
        return inputValue + 273.15;
      } else if (fromUnit === 'f' && toUnit === 'c') {
        return (inputValue - 32) * 5/9;
      } else if (fromUnit === 'f' && toUnit === 'k') {
        return ((inputValue - 32) * 5/9) + 273.15;
      } else if (fromUnit === 'k' && toUnit === 'c') {
        return inputValue - 273.15;
      } else if (fromUnit === 'k' && toUnit === 'f') {
        return ((inputValue - 273.15) * 9/5) + 32;
      } else {
        return inputValue; // Same unit
      }
    } else {
      // For other units, convert to base unit then to target unit
      const factors = conversionFactors[category];
      const valueInBaseUnit = inputValue * (factors as any)[fromUnit];
      return valueInBaseUnit / (factors as any)[toUnit];
    }
  }, [category, inputValue, fromUnit, toUnit]);
  
  // Unit labels
  const getUnitLabel = (unit: string): string => {
    const category = ['length', 'weight', 'volume', 'temperature', 'area'] as ConversionCategory[];
    for (const cat of category) {
      const found = conversionUnits[cat].find(u => u.value === unit);
      if (found) return found.label.split(' ')[0];
    }
    return unit;
  };
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unit Converter",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert between various measurement units including length, weight, volume, temperature, and area."
      intro="Our unit converter makes it easy to convert between different measurement units for length, weight, volume, temperature, and area - perfect for everyday calculations, cooking, DIY projects, and more."
      formula={
        <div>
          <p>The unit conversions use standard conversion formulas. For example:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Length:</strong></p>
            <code>1 inch = 2.54 centimeters</code>
            <code>1 foot = 0.3048 meters</code>
            <code>1 mile = 1.60934 kilometers</code>
            
            <p className="mt-3"><strong>Weight:</strong></p>
            <code>1 pound = 453.592 grams</code>
            <code>1 ounce = 28.3495 grams</code>
            
            <p className="mt-3"><strong>Temperature:</strong></p>
            <code>°F = (°C × 9/5) + 32</code>
            <code>°C = (°F - 32) × 5/9</code>
            <code>K = °C + 273.15</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "Why are there different units of measurement?",
          answer: "Different units of measurement developed across cultures throughout history. Today, most countries use the metric system (meters, grams, liters), while the US primarily uses the imperial or US customary system (feet, pounds, gallons)."
        },
        {
          question: "How accurate is this unit converter?",
          answer: "This converter uses standard conversion factors accurate to multiple decimal places. For everyday use and most technical applications, the results will be sufficiently precise. For highly specialized scientific or engineering work, dedicated tools may be needed."
        },
        {
          question: "Which countries use the metric system?",
          answer: "Almost all countries in the world officially use the metric system (SI units). The United States, Myanmar (Burma), and Liberia are the only countries that haven't fully adopted the metric system as their official system of weights and measures."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/unit-converter"
    >
      <Card>
        <CardContent className="p-6">
          <Tabs value={category} onValueChange={(value) => handleCategoryChange(value as ConversionCategory)} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="length">Length</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <CalculatorInput
                    id="input-value"
                    label="From"
                    type="number"
                    value={inputValue}
                    onChange={(value) => setInputValue(parseFloat(value) || 0)}
                    min={0}
                    step="any"
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Unit</label>
                    <select 
                      className="w-full border-input bg-background px-3 py-2 rounded-md border"
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                    >
                      {conversionUnits[category].map((unit) => (
                        <option key={`from-${unit.value}`} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <ResultDisplay
                    label="Result"
                    value={convertedValue.toPrecision(8).replace(/\.?0+$/, '')}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Unit</label>
                    <select 
                      className="w-full border-input bg-background px-3 py-2 rounded-md border"
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                    >
                      {conversionUnits[category].map((unit) => (
                        <option key={`to-${unit.value}`} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p className="text-center">
                  {inputValue} {getUnitLabel(fromUnit)} = {convertedValue.toPrecision(8).replace(/\.?0+$/, '')} {getUnitLabel(toUnit)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                <Button variant="outline" onClick={() => setInputValue(1)}>1</Button>
                <Button variant="outline" onClick={() => setInputValue(5)}>5</Button>
                <Button variant="outline" onClick={() => setInputValue(10)}>10</Button>
                <Button variant="outline" onClick={() => setInputValue(100)}>100</Button>
              </div>
              
              <div className="flex items-center justify-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const temp = fromUnit;
                    setFromUnit(toUnit);
                    setToUnit(temp);
                  }}
                  className="flex items-center"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Swap Units
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default UnitConverter;
