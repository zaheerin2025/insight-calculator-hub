
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';

const WallFramingCalculator: React.FC = () => {
  // Inputs
  const [wallLength, setWallLength] = useState<number>(20);
  const [wallHeight, setWallHeight] = useState<number>(8);
  const [studSpacing, setStudSpacing] = useState<number>(16); // in inches: 16" on center is standard
  const [topPlates, setTopPlates] = useState<number>(2); // typically double top plate
  const [doorCount, setDoorCount] = useState<number>(1);
  const [doorWidth, setDoorWidth] = useState<number>(3); // in feet
  const [windowCount, setWindowCount] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(3); // in feet
  
  // Results
  const [results, setResults] = useState<{
    studsNeeded: number;
    platesNeeded: number;
    headerBoards: number;
    jackStuds: number;
    crippleStuds: number;
    totalLumber: number;
  } | null>(null);
  
  // Calculate framing lumber
  const calculateFraming = () => {
    try {
      if (
        isNaN(wallLength) || isNaN(wallHeight) || isNaN(studSpacing) || 
        isNaN(topPlates) || isNaN(doorCount) || isNaN(doorWidth) ||
        isNaN(windowCount) || isNaN(windowWidth) ||
        wallLength <= 0 || wallHeight <= 0 || studSpacing <= 0 || 
        topPlates < 1 || doorCount < 0 || windowCount < 0 ||
        (doorCount > 0 && doorWidth <= 0) || (windowCount > 0 && windowWidth <= 0)
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Convert stud spacing to feet for calculations
      const studSpacingFeet = studSpacing / 12;
      
      // Calculate full-height studs (taking openings into account)
      const openingsWidth = (doorCount * doorWidth) + (windowCount * windowWidth);
      
      // Ensure openings don't exceed wall length
      if (openingsWidth > wallLength) {
        toast.error('Door and window width exceeds wall length');
        return;
      }
      
      const effectiveWallLength = wallLength - openingsWidth;
      
      // studs are typically spaced at 16" (1.33 ft) or 24" (2 ft) on center
      // add 1 extra stud for the end of the wall
      const studCount = Math.ceil(effectiveWallLength / studSpacingFeet) + 1;
      
      // Calculate plates (top and bottom)
      const bottomPlates = 1; // Typically 1 bottom plate
      const plateLength = wallLength;
      const platesNeeded = (topPlates + bottomPlates) * Math.ceil(plateLength / 8); // assuming 8' lumber lengths
      
      // Calculate header boards (2 boards per opening, usually)
      const headerBoardsPerOpening = 2;
      const headerBoards = headerBoardsPerOpening * (doorCount + windowCount);
      
      // Calculate jack studs (support headers, 2 per opening)
      const jackStudsPerOpening = 2;
      const jackStuds = jackStudsPerOpening * (doorCount + windowCount);
      
      // Calculate cripple studs (above windows)
      // Assume 1 cripple stud per 16" of window width, plus one for the end
      const crippleStudsPerWindow = Math.ceil((windowWidth * 12) / studSpacing) + 1;
      const crippleStuds = crippleStudsPerWindow * windowCount;
      
      // Total lumber needed
      const totalLumber = studCount + platesNeeded + headerBoards + jackStuds + crippleStuds;
      
      setResults({
        studsNeeded: studCount,
        platesNeeded,
        headerBoards,
        jackStuds,
        crippleStuds,
        totalLumber
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
    "name": "Wall Framing Calculator",
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
      title="Wall Framing Calculator"
      description="Calculate lumber needed for wall framing based on wall dimensions and stud spacing."
      intro="Our wall framing calculator helps you determine the amount of lumber required for framing walls, including studs, plates, headers, and more."
      formula={
        <div>
          <p>The wall framing calculations use the following approach:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Effective Wall Length:</strong></p>
            <code>Effective Length = Wall Length - Door Width × Door Count - Window Width × Window Count</code>
            
            <p className="mt-3"><strong>Full-Height Studs:</strong></p>
            <code>Stud Count = (Effective Wall Length ÷ Stud Spacing) + 1</code>
            
            <p className="mt-3"><strong>Plates:</strong></p>
            <code>Plate Count = (Top Plates + 1 Bottom Plate) × (Wall Length ÷ Standard Lumber Length)</code>
            
            <p className="mt-3"><strong>Headers, Jack Studs, and Cripple Studs:</strong></p>
            <code>Header Boards = 2 × (Door Count + Window Count)</code>
            <code>Jack Studs = 2 × (Door Count + Window Count)</code>
            <code>Cripple Studs = Window Count × ((Window Width × 12 ÷ Stud Spacing) + 1)</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What lumber size should I use for wall framing?",
          answer: "For most residential construction, 2×4 lumber is standard for interior walls, while 2×6 is often used for exterior walls (especially in colder climates for better insulation). Always check local building codes for specific requirements."
        },
        {
          question: "What's the difference between standard stud spacing options?",
          answer: "The most common stud spacing is 16\" on center (O.C.), which provides good strength and is compatible with standard 4×8 sheet materials. 24\" O.C. spacing uses less lumber but may require thicker drywall. 12\" O.C. offers extra strength for heavy loads or high walls."
        },
        {
          question: "How tall should my wall headers be?",
          answer: "Header size depends on the opening width and load above. For non-load bearing interior walls, 2×4s on edge may be sufficient. For load-bearing walls with openings under 4 feet, 2×6 or 2×8 headers are common. Larger openings or heavy loads above may require 2×10 or 2×12 headers."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/wall-framing-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Wall Dimensions</h4>
            
            <CalculatorInput
              id="wall-length"
              label="Wall Length"
              type="number"
              value={wallLength}
              onChange={(value) => setWallLength(parseFloat(value) || 0)}
              min={1}
              step={0.5}
              suffix=" ft"
              helperText="Length of the wall in feet"
            />
            
            <CalculatorInput
              id="wall-height"
              label="Wall Height"
              type="number"
              value={wallHeight}
              onChange={(value) => setWallHeight(parseFloat(value) || 0)}
              min={1}
              step={0.5}
              suffix=" ft"
              helperText="Height of the wall in feet"
              className="mt-3"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Framing Options</h4>
            
            <CalculatorInput
              id="stud-spacing"
              label="Stud Spacing"
              type="number"
              value={studSpacing}
              onChange={(value) => setStudSpacing(parseFloat(value) || 0)}
              min={1}
              step={1}
              suffix=" inches"
              helperText="Spacing between studs (16\" or 24\" is standard)"
            />
            
            <CalculatorInput
              id="top-plates"
              label="Number of Top Plates"
              type="number"
              value={topPlates}
              onChange={(value) => setTopPlates(parseInt(value) || 0)}
              min={1}
              max={3}
              step={1}
              helperText="Typically 2 top plates (double top plate)"
              className="mt-3"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Openings</h4>
            
            <CalculatorInput
              id="door-count"
              label="Number of Doors"
              type="number"
              value={doorCount}
              onChange={(value) => setDoorCount(parseInt(value) || 0)}
              min={0}
              step={1}
              helperText="Number of door openings in the wall"
            />
            
            <CalculatorInput
              id="door-width"
              label="Door Width"
              type="number"
              value={doorWidth}
              onChange={(value) => setDoorWidth(parseFloat(value) || 0)}
              min={0.5}
              step={0.5}
              suffix=" ft"
              helperText="Width of each door (typically 3 ft for standard doors)"
              className="mt-3"
            />
            
            <CalculatorInput
              id="window-count"
              label="Number of Windows"
              type="number"
              value={windowCount}
              onChange={(value) => setWindowCount(parseInt(value) || 0)}
              min={0}
              step={1}
              helperText="Number of window openings in the wall"
              className="mt-3"
            />
            
            <CalculatorInput
              id="window-width"
              label="Window Width"
              type="number"
              value={windowWidth}
              onChange={(value) => setWindowWidth(parseFloat(value) || 0)}
              min={0.5}
              step={0.5}
              suffix=" ft"
              helperText="Width of each window"
              className="mt-3"
            />
          </div>
          
          <Button 
            onClick={calculateFraming}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Framing Materials
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Lumber Requirements</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Full-Height Studs Needed"
                    value={`${results.studsNeeded} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Plates Needed"
                    value={`${results.platesNeeded} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Header Boards"
                    value={`${results.headerBoards} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Jack Studs"
                    value={`${results.jackStuds} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Cripple Studs"
                    value={`${results.crippleStuds} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Total Lumber Pieces"
                    value={`${results.totalLumber} pieces`}
                    icon={<Construction className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For your {wallLength} ft × {wallHeight} ft wall with {studSpacing}&quot; stud spacing:</p>
                  <p className="mt-2">You'll need a total of <strong>{results.totalLumber} pieces</strong> of lumber.</p>
                  <p className="mt-2">This includes {results.studsNeeded} full-height studs, {results.platesNeeded} plates, {results.headerBoards} header boards, {results.jackStuds} jack studs, and {results.crippleStuds} cripple studs.</p>
                  <p className="mt-2">Most residential walls use 2×4 lumber for interior walls or 2×6 for exterior walls.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default WallFramingCalculator;
