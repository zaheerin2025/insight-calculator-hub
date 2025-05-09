
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FlooringCalculator: React.FC = () => {
  // Tab 1: Rectangular Room
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(10);
  const [wastagePercent, setWastagePercent] = useState<number>(10);
  const [rectangleResults, setRectangleResults] = useState<{
    floorArea: number;
    areaWithWastage: number;
    boxesNeeded: number;
  } | null>(null);
  const [flooringType, setFlooringType] = useState<"wood" | "laminate" | "tile" | "carpet">("wood");
  const [tileSize, setTileSize] = useState<number>(12); // in inches
  const [tilesPerBox, setTilesPerBox] = useState<number>(20);
  const [boxCoverage, setBoxCoverage] = useState<number>(20); // in sq ft
  
  // Tab 2: L-Shaped Room
  const [mainLength, setMainLength] = useState<number>(12);
  const [mainWidth, setMainWidth] = useState<number>(10);
  const [extLength, setExtLength] = useState<number>(6);
  const [extWidth, setExtWidth] = useState<number>(8);
  const [lShapeWastagePercent, setLShapeWastagePercent] = useState<number>(15);
  const [lShapeResults, setLShapeResults] = useState<{
    floorArea: number;
    areaWithWastage: number;
    boxesNeeded: number;
  } | null>(null);
  const [lShapeFlooringType, setLShapeFlooringType] = useState<"wood" | "laminate" | "tile" | "carpet">("wood");
  const [lShapeTileSize, setLShapeTileSize] = useState<number>(12); // in inches
  const [lShapeTilesPerBox, setLShapeTilesPerBox] = useState<number>(20);
  const [lShapeBoxCoverage, setLShapeBoxCoverage] = useState<number>(20); // in sq ft
  
  // Calculate for rectangular room
  const calculateRectangular = () => {
    try {
      if (
        isNaN(length) || isNaN(width) || isNaN(wastagePercent) || 
        length <= 0 || width <= 0 || wastagePercent < 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      let boxesNeeded = 0;
      const floorArea = length * width;
      const wastageMultiplier = 1 + (wastagePercent / 100);
      const areaWithWastage = floorArea * wastageMultiplier;
      
      if (flooringType === "tile") {
        if (tileSize <= 0 || tilesPerBox <= 0) {
          toast.error('Please enter valid tile size and tiles per box');
          return;
        }
        
        // Convert tile size from inches to feet for calculation
        const tileSizeFt = tileSize / 12;
        const tileArea = tileSizeFt * tileSizeFt;
        const totalTiles = Math.ceil(areaWithWastage / tileArea);
        boxesNeeded = Math.ceil(totalTiles / tilesPerBox);
      } else {
        // For wood, laminate, carpet that comes in boxes by square footage
        if (boxCoverage <= 0) {
          toast.error('Please enter valid box coverage');
          return;
        }
        
        boxesNeeded = Math.ceil(areaWithWastage / boxCoverage);
      }
      
      setRectangleResults({
        floorArea,
        areaWithWastage,
        boxesNeeded
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate for L-shaped room
  const calculateLShape = () => {
    try {
      if (
        isNaN(mainLength) || isNaN(mainWidth) || 
        isNaN(extLength) || isNaN(extWidth) || 
        isNaN(lShapeWastagePercent) || 
        mainLength <= 0 || mainWidth <= 0 ||
        extLength <= 0 || extWidth <= 0 ||
        lShapeWastagePercent < 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      let boxesNeeded = 0;
      const mainArea = mainLength * mainWidth;
      const extArea = extLength * extWidth;
      const floorArea = mainArea + extArea;
      const wastageMultiplier = 1 + (lShapeWastagePercent / 100);
      const areaWithWastage = floorArea * wastageMultiplier;
      
      if (lShapeFlooringType === "tile") {
        if (lShapeTileSize <= 0 || lShapeTilesPerBox <= 0) {
          toast.error('Please enter valid tile size and tiles per box');
          return;
        }
        
        // Convert tile size from inches to feet for calculation
        const tileSizeFt = lShapeTileSize / 12;
        const tileArea = tileSizeFt * tileSizeFt;
        const totalTiles = Math.ceil(areaWithWastage / tileArea);
        boxesNeeded = Math.ceil(totalTiles / lShapeTilesPerBox);
      } else {
        // For wood, laminate, carpet that comes in boxes by square footage
        if (lShapeBoxCoverage <= 0) {
          toast.error('Please enter valid box coverage');
          return;
        }
        
        boxesNeeded = Math.ceil(areaWithWastage / lShapeBoxCoverage);
      }
      
      setLShapeResults({
        floorArea,
        areaWithWastage,
        boxesNeeded
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const flooringOptions = [
    { value: "wood", label: "Hardwood" },
    { value: "laminate", label: "Laminate" },
    { value: "tile", label: "Tile" },
    { value: "carpet", label: "Carpet" }
  ];
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flooring Calculator",
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
      title="Flooring Calculator"
      description="Calculate how much flooring material you need for your project based on room dimensions."
      intro="Our flooring calculator helps you estimate the amount of various flooring materials needed for your project, including hardwood, laminate, tile, and carpet."
      formula={
        <div>
          <p>The flooring calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Rectangular Room Area:</strong></p>
            <code>Area = Length × Width</code>
            
            <p className="mt-3"><strong>L-Shaped Room Area:</strong></p>
            <code>Area = (Main Length × Main Width) + (Extension Length × Extension Width)</code>
            
            <p className="mt-3"><strong>Area with Wastage:</strong></p>
            <code>Area with Wastage = Area × (1 + Wastage%/100)</code>
            
            <p className="mt-3"><strong>For Wood, Laminate, Carpet:</strong></p>
            <code>Boxes Needed = Area with Wastage ÷ Box Coverage</code>
            
            <p className="mt-3"><strong>For Tile:</strong></p>
            <code>Tile Area = (Tile Size in inches ÷ 12)²</code>
            <code>Total Tiles = Area with Wastage ÷ Tile Area</code>
            <code>Boxes Needed = Total Tiles ÷ Tiles per Box</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "Why do I need to add wastage when calculating flooring?",
          answer: "Wastage accounts for cutting, mistakes, damaged materials, and future repairs. For simple rectangular rooms, 10% wastage is common. For more complex rooms (like L-shaped) or diagonal installations, 15-20% is recommended."
        },
        {
          question: "How do I determine the right type of flooring for my project?",
          answer: "Consider factors like room usage (high traffic vs. low traffic), moisture exposure (bathrooms vs. bedrooms), durability needs, maintenance preferences, your budget, and aesthetic preferences. Each flooring type has different pros and cons."
        },
        {
          question: "How can I reduce waste when installing flooring?",
          answer: "Plan your layout carefully before cutting, start installation from the center of the room for tile, or from the longest straight wall for planks. Save larger cut pieces for other areas, and consider your installation pattern carefully to maximize material usage."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/flooring-calculator"
    >
      <Tabs defaultValue="rectangular" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rectangular">Rectangular Room</TabsTrigger>
          <TabsTrigger value="l-shape">L-Shaped Room</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Rectangular Room */}
        <TabsContent value="rectangular" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="room-length"
                label="Room Length"
                type="number"
                value={length}
                onChange={(value) => setLength(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Length of the room in feet"
              />
              
              <CalculatorInput
                id="room-width"
                label="Room Width"
                type="number"
                value={width}
                onChange={(value) => setWidth(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Width of the room in feet"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Flooring Type</label>
                <select 
                  className="w-full border-input bg-background px-3 py-2 rounded-md border"
                  value={flooringType}
                  onChange={(e) => setFlooringType(e.target.value as "wood" | "laminate" | "tile" | "carpet")}
                >
                  {flooringOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">Select your flooring material</p>
              </div>
              
              {flooringType === "tile" ? (
                <>
                  <CalculatorInput
                    id="tile-size"
                    label="Tile Size"
                    type="number"
                    value={tileSize}
                    onChange={(value) => setTileSize(parseFloat(value) || 0)}
                    min={1}
                    step={0.5}
                    suffix=" inches"
                    helperText="Size of one side of a square tile (e.g., 12 for a 12×12 tile)"
                  />
                  
                  <CalculatorInput
                    id="tiles-per-box"
                    label="Tiles per Box"
                    type="number"
                    value={tilesPerBox}
                    onChange={(value) => setTilesPerBox(parseFloat(value) || 0)}
                    min={1}
                    step={1}
                    helperText="Number of tiles in each box"
                  />
                </>
              ) : (
                <CalculatorInput
                  id="box-coverage"
                  label="Box Coverage"
                  type="number"
                  value={boxCoverage}
                  onChange={(value) => setBoxCoverage(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" sq ft"
                  helperText="Square feet covered by one box"
                />
              )}
              
              <CalculatorInput
                id="wastage"
                label="Wastage Percentage"
                type="number"
                value={wastagePercent}
                onChange={(value) => setWastagePercent(parseFloat(value) || 0)}
                min={0}
                max={100}
                step={1}
                suffix="%"
                helperText="Add extra for cuts and waste (typically 10-15%)"
              />
              
              <Button 
                onClick={calculateRectangular}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {rectangleResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Flooring Required</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Room Area"
                        value={`${rectangleResults.floorArea.toFixed(2)} sq ft`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Area with Wastage"
                        value={`${rectangleResults.areaWithWastage.toFixed(2)} sq ft`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Boxes Needed"
                        value={`${rectangleResults.boxesNeeded} boxes`}
                        icon={<Construction className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>This calculation is for a {length} ft × {width} ft rectangular room with {wastagePercent}% wastage.</p>
                      <p className="mt-2">For {flooringType === "tile" ? `${tileSize}×${tileSize} inch tiles` : flooringType} flooring, you'll need {rectangleResults.boxesNeeded} boxes.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: L-Shaped Room */}
        <TabsContent value="l-shape" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2">Main Rectangle</h4>
                
                <CalculatorInput
                  id="main-length"
                  label="Length"
                  type="number"
                  value={mainLength}
                  onChange={(value) => setMainLength(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" ft"
                  helperText="Length of the main section in feet"
                />
                
                <CalculatorInput
                  id="main-width"
                  label="Width"
                  type="number"
                  value={mainWidth}
                  onChange={(value) => setMainWidth(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" ft"
                  helperText="Width of the main section in feet"
                  className="mt-3"
                />
              </div>
              
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2">Extension Rectangle</h4>
                
                <CalculatorInput
                  id="ext-length"
                  label="Length"
                  type="number"
                  value={extLength}
                  onChange={(value) => setExtLength(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" ft"
                  helperText="Length of the extension section in feet"
                />
                
                <CalculatorInput
                  id="ext-width"
                  label="Width"
                  type="number"
                  value={extWidth}
                  onChange={(value) => setExtWidth(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" ft"
                  helperText="Width of the extension section in feet"
                  className="mt-3"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Flooring Type</label>
                <select 
                  className="w-full border-input bg-background px-3 py-2 rounded-md border"
                  value={lShapeFlooringType}
                  onChange={(e) => setLShapeFlooringType(e.target.value as "wood" | "laminate" | "tile" | "carpet")}
                >
                  {flooringOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">Select your flooring material</p>
              </div>
              
              {lShapeFlooringType === "tile" ? (
                <>
                  <CalculatorInput
                    id="l-shape-tile-size"
                    label="Tile Size"
                    type="number"
                    value={lShapeTileSize}
                    onChange={(value) => setLShapeTileSize(parseFloat(value) || 0)}
                    min={1}
                    step={0.5}
                    suffix=" inches"
                    helperText="Size of one side of a square tile (e.g., 12 for a 12×12 tile)"
                  />
                  
                  <CalculatorInput
                    id="l-shape-tiles-per-box"
                    label="Tiles per Box"
                    type="number"
                    value={lShapeTilesPerBox}
                    onChange={(value) => setLShapeTilesPerBox(parseFloat(value) || 0)}
                    min={1}
                    step={1}
                    helperText="Number of tiles in each box"
                  />
                </>
              ) : (
                <CalculatorInput
                  id="l-shape-box-coverage"
                  label="Box Coverage"
                  type="number"
                  value={lShapeBoxCoverage}
                  onChange={(value) => setLShapeBoxCoverage(parseFloat(value) || 0)}
                  min={0.1}
                  step={0.1}
                  suffix=" sq ft"
                  helperText="Square feet covered by one box"
                />
              )}
              
              <CalculatorInput
                id="l-shape-wastage"
                label="Wastage Percentage"
                type="number"
                value={lShapeWastagePercent}
                onChange={(value) => setLShapeWastagePercent(parseFloat(value) || 0)}
                min={0}
                max={100}
                step={1}
                suffix="%"
                helperText="Add extra for cuts and waste (typically 15-20% for L-shapes)"
              />
              
              <Button 
                onClick={calculateLShape}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {lShapeResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Flooring Required</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Total Room Area"
                        value={`${lShapeResults.floorArea.toFixed(2)} sq ft`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Area with Wastage"
                        value={`${lShapeResults.areaWithWastage.toFixed(2)} sq ft`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Boxes Needed"
                        value={`${lShapeResults.boxesNeeded} boxes`}
                        icon={<Construction className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>This calculation is for an L-shaped room with a main section of {mainLength} ft × {mainWidth} ft and an extension of {extLength} ft × {extWidth} ft.</p>
                      <p className="mt-2">For {lShapeFlooringType === "tile" ? `${lShapeTileSize}×${lShapeTileSize} inch tiles` : lShapeFlooringType} flooring with {lShapeWastagePercent}% wastage, you'll need {lShapeResults.boxesNeeded} boxes.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
};

export default FlooringCalculator;
