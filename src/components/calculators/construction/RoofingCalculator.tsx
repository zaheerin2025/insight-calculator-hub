
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';

const RoofingCalculator: React.FC = () => {
  // Inputs
  const [length, setLength] = useState<number>(40);
  const [width, setWidth] = useState<number>(30);
  const [pitch, setPitch] = useState<number>(6); // Pitch in "X in 12" format (e.g., 6/12)
  const [wastePercent, setWastePercent] = useState<number>(15);
  const [roofingType, setRoofingType] = useState<"shingles" | "metal" | "tile">("shingles");
  
  // Results
  const [results, setResults] = useState<{
    footprintArea: number;
    actualRoofArea: number;
    roofAreaWithWaste: number;
    materialsNeeded: string;
    bundles?: number;
    squares?: number;
    panels?: number;
  } | null>(null);
  
  // Calculate roofing materials
  const calculateRoofing = () => {
    try {
      if (
        isNaN(length) || isNaN(width) || isNaN(pitch) || isNaN(wastePercent) ||
        length <= 0 || width <= 0 || pitch < 0 || wastePercent < 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate footprint area
      const footprintArea = length * width;
      
      // Calculate pitch factor
      const pitchFactor = Math.sqrt(1 + (pitch/12) * (pitch/12));
      
      // Calculate actual roof area
      const actualRoofArea = footprintArea * pitchFactor;
      
      // Add waste factor
      const wasteMultiplier = 1 + (wastePercent / 100);
      const roofAreaWithWaste = actualRoofArea * wasteMultiplier;
      
      // Calculate materials based on roofing type
      let materialsNeeded = "";
      let bundles, squares, panels;
      
      if (roofingType === "shingles") {
        // 1 square = 100 sq ft, typically 3 bundles per square
        squares = Math.ceil(roofAreaWithWaste / 100);
        bundles = squares * 3;
        materialsNeeded = `${squares} squares (${bundles} bundles) of shingles`;
      } else if (roofingType === "metal") {
        // Typical metal panel is 3 ft wide by 16 ft long = 48 sq ft per panel
        panels = Math.ceil(roofAreaWithWaste / 48);
        materialsNeeded = `${panels} metal panels (3 ft × 16 ft)`;
      } else if (roofingType === "tile") {
        // Concrete/clay tiles: about 100 tiles per square (100 sq ft)
        squares = Math.ceil(roofAreaWithWaste / 100);
        const tiles = squares * 100;
        materialsNeeded = `${squares} squares (${tiles} tiles)`;
      }
      
      setResults({
        footprintArea,
        actualRoofArea,
        roofAreaWithWaste,
        materialsNeeded,
        bundles,
        squares,
        panels
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const roofingOptions = [
    { value: "shingles", label: "Asphalt Shingles" },
    { value: "metal", label: "Metal Panels" },
    { value: "tile", label: "Concrete/Clay Tiles" }
  ];
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Roofing Calculator",
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
      title="Roofing Calculator"
      description="Calculate roofing materials needed based on roof dimensions and type."
      intro="Our roofing calculator helps you estimate the amount of roofing materials needed for your project, including shingles, metal panels, or tiles, based on your roof's dimensions and pitch."
      formula={
        <div>
          <p>The roofing calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Footprint Area:</strong></p>
            <code>Footprint Area = Length × Width</code>
            
            <p className="mt-3"><strong>Pitch Factor:</strong></p>
            <code>Pitch Factor = √(1 + (Pitch/12)²)</code>
            
            <p className="mt-3"><strong>Actual Roof Area:</strong></p>
            <code>Actual Roof Area = Footprint Area × Pitch Factor</code>
            
            <p className="mt-3"><strong>Roof Area with Waste:</strong></p>
            <code>Roof Area with Waste = Actual Roof Area × (1 + Waste%/100)</code>
            
            <p className="mt-3"><strong>Materials Calculation:</strong></p>
            <code>Shingles: Squares = Roof Area with Waste ÷ 100</code>
            <code>Metal: Panels = Roof Area with Waste ÷ 48</code>
            <code>Tile: Tiles = (Roof Area with Waste ÷ 100) × 100</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What's a roof pitch and how do I measure it?",
          answer: "Roof pitch is the slope of your roof, typically expressed as X/12, where X is the number of inches the roof rises vertically for every 12 inches of horizontal distance. Common pitches range from 4/12 to 9/12. To measure, place a level horizontally against the roof, measure 12 inches along the level, then measure vertically from that point to the roof surface."
        },
        {
          question: "Why do I need to add waste factor when calculating roofing materials?",
          answer: "Waste is added to account for cutting, overlaps, damaged materials, and complex roof features like valleys, hips, and chimneys. Typically, 10-15% is added for simple roofs, and 15-20% for more complex designs with multiple angles and features."
        },
        {
          question: "How do I choose the right roofing material?",
          answer: "Consider climate (temperature extremes, rainfall, wind), roof pitch (lower pitches may require specific materials), aesthetics, longevity needs, budget, and local building codes. Asphalt shingles are most common and economical, while metal offers durability, and tiles provide a distinctive look with excellent longevity."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/roofing-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="roof-length"
            label="Roof Length"
            type="number"
            value={length}
            onChange={(value) => setLength(parseFloat(value) || 0)}
            min={1}
            step={0.5}
            suffix=" ft"
            helperText="Length of the roof's rectangular footprint"
          />
          
          <CalculatorInput
            id="roof-width"
            label="Roof Width"
            type="number"
            value={width}
            onChange={(value) => setWidth(parseFloat(value) || 0)}
            min={1}
            step={0.5}
            suffix=" ft"
            helperText="Width of the roof's rectangular footprint"
          />
          
          <CalculatorInput
            id="roof-pitch"
            label="Roof Pitch"
            type="number"
            value={pitch}
            onChange={(value) => setPitch(parseFloat(value) || 0)}
            min={0}
            max={12}
            step={0.5}
            suffix="/12"
            helperText="Pitch expressed as X/12 (e.g., 6/12 means 6 in. rise per 12 in. run)"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Roofing Material</label>
            <select 
              className="w-full border-input bg-background px-3 py-2 rounded-md border"
              value={roofingType}
              onChange={(e) => setRoofingType(e.target.value as "shingles" | "metal" | "tile")}
            >
              {roofingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">Select your roofing material</p>
          </div>
          
          <CalculatorInput
            id="waste-percent"
            label="Waste Percentage"
            type="number"
            value={wastePercent}
            onChange={(value) => setWastePercent(parseFloat(value) || 0)}
            min={0}
            max={100}
            step={1}
            suffix="%"
            helperText="Add extra for cuts, overlaps, and waste (typically 10-20%)"
          />
          
          <Button 
            onClick={calculateRoofing}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Roofing Materials
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Roofing Materials Required</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Roof Footprint Area"
                    value={`${results.footprintArea.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Actual Roof Surface Area"
                    value={`${results.actualRoofArea.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Roof Area with Waste"
                    value={`${results.roofAreaWithWaste.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label={`${roofingType === "shingles" ? "Shingles" : roofingType === "metal" ? "Metal Panels" : "Tiles"} Needed`}
                    value={results.materialsNeeded}
                    icon={<Construction className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For your {length} ft × {width} ft roof with a {pitch}/12 pitch, you'll need:</p>
                  {roofingType === "shingles" && (
                    <p className="mt-2"><strong>{results.squares} squares</strong> ({results.bundles} bundles) of asphalt shingles.</p>
                  )}
                  {roofingType === "metal" && (
                    <p className="mt-2"><strong>{results.panels} metal panels</strong> (3 ft × 16 ft each).</p>
                  )}
                  {roofingType === "tile" && (
                    <p className="mt-2"><strong>{results.squares} squares</strong> (approximately {(results.squares || 0) * 100} individual tiles).</p>
                  )}
                  <p className="mt-2">This calculation includes a {wastePercent}% waste factor for cutting, overlaps, and complexities.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RoofingCalculator;
