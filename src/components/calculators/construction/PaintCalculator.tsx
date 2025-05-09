
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';

const PaintCalculator: React.FC = () => {
  // Inputs
  const [wallHeight, setWallHeight] = useState<number>(8);
  const [roomLength, setRoomLength] = useState<number>(12);
  const [roomWidth, setRoomWidth] = useState<number>(10);
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);
  const [coverage, setCoverage] = useState<number>(400); // sq ft per gallon
  
  // Results
  const [results, setResults] = useState<{
    wallArea: number;
    doorsArea: number;
    windowsArea: number;
    netArea: number;
    gallonsNeeded: number;
  } | null>(null);
  
  // Calculate paint needed
  const calculatePaint = () => {
    try {
      if (
        isNaN(wallHeight) || isNaN(roomLength) || isNaN(roomWidth) || 
        isNaN(doors) || isNaN(windows) || isNaN(coats) || isNaN(coverage) ||
        wallHeight <= 0 || roomLength <= 0 || roomWidth <= 0 || 
        doors < 0 || windows < 0 || coats <= 0 || coverage <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate total wall area
      const perimeter = 2 * (roomLength + roomWidth);
      const wallArea = perimeter * wallHeight;
      
      // Standard door size: 3ft x 7ft = 21 sq ft
      const doorsArea = doors * 21;
      
      // Standard window size: 3ft x 4ft = 12 sq ft
      const windowsArea = windows * 12;
      
      // Net paintable area
      const netArea = wallArea - doorsArea - windowsArea;
      
      // Calculate gallons needed
      const totalAreaWithCoats = netArea * coats;
      const gallonsNeeded = totalAreaWithCoats / coverage;
      
      setResults({
        wallArea,
        doorsArea,
        windowsArea,
        netArea,
        gallonsNeeded
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Paint Calculator",
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
      title="Paint Calculator"
      description="Calculate how much paint you need based on wall dimensions and paint coverage."
      intro="Our paint calculator helps you estimate the amount of paint needed for your project by calculating the area to be painted and taking into account doors, windows, and the number of coats."
      formula={
        <div>
          <p>The paint calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Wall Area:</strong></p>
            <code>Wall Area = Perimeter × Height</code>
            <code>Perimeter = 2 × (Room Length + Room Width)</code>
            
            <p className="mt-3"><strong>Net Paintable Area:</strong></p>
            <code>Net Area = Wall Area - Door Area - Window Area</code>
            <code>Door Area = Number of Doors × 21 sq ft (standard door size)</code>
            <code>Window Area = Number of Windows × 12 sq ft (standard window size)</code>
            
            <p className="mt-3"><strong>Paint Needed:</strong></p>
            <code>Total Area = Net Area × Number of Coats</code>
            <code>Gallons Needed = Total Area ÷ Coverage per Gallon</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How much does a gallon of paint cover?",
          answer: "Coverage varies by paint type and surface texture, but a gallon typically covers 350-400 square feet for smooth surfaces and 250-300 square feet for textured surfaces. Premium paints may cover more area."
        },
        {
          question: "Do I need primer before painting?",
          answer: "Primer is recommended when: painting over dark colors with light ones, painting new drywall, painting over stains or repairs, changing paint types (e.g., oil to latex), or painting over glossy surfaces. Modern paint-and-primer-in-one products may eliminate this step in some cases."
        },
        {
          question: "How many coats of paint do I need?",
          answer: "Most painting projects require 2 coats for even coverage and color. You might need additional coats when covering dark colors with light ones or using bright/deep colors that have less hiding power."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/paint-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="room-length"
            label="Room Length"
            type="number"
            value={roomLength}
            onChange={(value) => setRoomLength(parseFloat(value) || 0)}
            min={0.1}
            step={0.1}
            suffix=" ft"
            helperText="Length of the room in feet"
          />
          
          <CalculatorInput
            id="room-width"
            label="Room Width"
            type="number"
            value={roomWidth}
            onChange={(value) => setRoomWidth(parseFloat(value) || 0)}
            min={0.1}
            step={0.1}
            suffix=" ft"
            helperText="Width of the room in feet"
          />
          
          <CalculatorInput
            id="wall-height"
            label="Wall Height"
            type="number"
            value={wallHeight}
            onChange={(value) => setWallHeight(parseFloat(value) || 0)}
            min={0.1}
            step={0.1}
            suffix=" ft"
            helperText="Height of the walls in feet"
          />
          
          <CalculatorInput
            id="doors"
            label="Number of Doors"
            type="number"
            value={doors}
            onChange={(value) => setDoors(parseInt(value) || 0)}
            min={0}
            step={1}
            helperText="Number of doors in the room"
          />
          
          <CalculatorInput
            id="windows"
            label="Number of Windows"
            type="number"
            value={windows}
            onChange={(value) => setWindows(parseInt(value) || 0)}
            min={0}
            step={1}
            helperText="Number of windows in the room"
          />
          
          <CalculatorInput
            id="coats"
            label="Number of Coats"
            type="number"
            value={coats}
            onChange={(value) => setCoats(parseInt(value) || 1)}
            min={1}
            max={5}
            step={1}
            helperText="Number of paint coats (typically 2)"
          />
          
          <CalculatorInput
            id="coverage"
            label="Paint Coverage"
            type="number"
            value={coverage}
            onChange={(value) => setCoverage(parseFloat(value) || 0)}
            min={100}
            step={50}
            suffix=" sq ft/gal"
            helperText="Coverage per gallon (check paint can)"
          />
          
          <Button 
            onClick={calculatePaint}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Paint Needed
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Paint Required</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Total Wall Area"
                    value={`${results.wallArea.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Area of Doors & Windows"
                    value={`${(results.doorsArea + results.windowsArea).toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Net Paintable Area"
                    value={`${results.netArea.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Paint Needed"
                    value={`${Math.ceil(results.gallonsNeeded)} gallons`}
                    icon={<Construction className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>You need <strong>{Math.ceil(results.gallonsNeeded)} gallons</strong> of paint for a {roomLength} × {roomWidth} ft room with {wallHeight} ft walls.</p>
                  <p className="mt-2">This calculation accounts for {doors} door(s), {windows} window(s), and {coats} coat(s) of paint.</p>
                  <p className="mt-2">Consider buying a little extra paint for touch-ups later.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PaintCalculator;
