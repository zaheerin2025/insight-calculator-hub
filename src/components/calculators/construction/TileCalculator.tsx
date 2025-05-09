
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';

const TileCalculator: React.FC = () => {
  // Inputs
  const [areaLength, setAreaLength] = useState<number>(10);
  const [areaWidth, setAreaWidth] = useState<number>(12);
  const [tileLength, setTileLength] = useState<number>(12); // in inches
  const [tileWidth, setTileWidth] = useState<number>(12); // in inches
  const [groutSize, setGroutSize] = useState<number>(0.25); // in inches
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [tilesPerBox, setTilesPerBox] = useState<number>(20);
  
  // Results
  const [results, setResults] = useState<{
    areaSquareFeet: number;
    tileSizeSquareFeet: number;
    tilesNeeded: number;
    boxesNeeded: number;
    groutNeeded: number; // in pounds
  } | null>(null);
  
  // Calculate tiles needed
  const calculateTiles = () => {
    try {
      if (
        isNaN(areaLength) || isNaN(areaWidth) || 
        isNaN(tileLength) || isNaN(tileWidth) || 
        isNaN(groutSize) || isNaN(wastePercent) || isNaN(tilesPerBox) ||
        areaLength <= 0 || areaWidth <= 0 || 
        tileLength <= 0 || tileWidth <= 0 || 
        groutSize < 0 || wastePercent < 0 || tilesPerBox <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Convert tile dimensions from inches to feet
      const tileLengthFeet = tileLength / 12;
      const tileWidthFeet = tileWidth / 12;
      const groutSizeFeet = groutSize / 12;
      
      // Calculate area
      const areaSquareFeet = areaLength * areaWidth;
      
      // Calculate single tile area (including grout)
      const tileLengthWithGrout = tileLengthFeet + groutSizeFeet;
      const tileWidthWithGrout = tileWidthFeet + groutSizeFeet;
      const tileSizeSquareFeet = tileLengthFeet * tileWidthFeet;
      const tileSizeWithGroutSquareFeet = tileLengthWithGrout * tileWidthWithGrout;
      
      // Calculate tiles needed
      const tilesNeededExact = areaSquareFeet / tileSizeWithGroutSquareFeet;
      const tilesWithWaste = tilesNeededExact * (1 + (wastePercent / 100));
      const tilesNeeded = Math.ceil(tilesWithWaste);
      
      // Calculate boxes needed
      const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);
      
      // Estimate grout needed (typically 1-2 pounds per 10 sq ft depending on grout line width and tile size)
      const groutFactor = groutSize < 0.125 ? 1 : groutSize < 0.25 ? 1.5 : 2; // pounds per 10 sq ft
      const groutNeeded = (areaSquareFeet / 10) * groutFactor;
      
      setResults({
        areaSquareFeet,
        tileSizeSquareFeet,
        tilesNeeded,
        boxesNeeded,
        groutNeeded
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
    "name": "Tile Calculator",
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
      title="Tile Calculator"
      description="Calculate how many tiles you need for your project based on dimensions and tile size."
      intro="Our tile calculator helps you determine the number of tiles and boxes needed for your floor, wall, or backsplash project, while accounting for grout lines and wastage."
      formula={
        <div>
          <p>The tile calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Area to be Tiled:</strong></p>
            <code>Area = Length × Width</code>
            
            <p className="mt-3"><strong>Tile Area with Grout:</strong></p>
            <code>Tile Length with Grout = Tile Length + Grout Size</code>
            <code>Tile Width with Grout = Tile Width + Grout Size</code>
            <code>Tile Area with Grout = Tile Length with Grout × Tile Width with Grout</code>
            
            <p className="mt-3"><strong>Tiles Needed:</strong></p>
            <code>Base Tiles Needed = Area to be Tiled ÷ Tile Area with Grout</code>
            <code>Tiles with Waste = Base Tiles Needed × (1 + Waste%/100)</code>
            
            <p className="mt-3"><strong>Boxes Needed:</strong></p>
            <code>Boxes = Tiles with Waste ÷ Tiles per Box</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "Why do I need to add waste when calculating tiles?",
          answer: "Waste accounts for cutting, breakage, mistakes, and future replacements. For simple square or rectangular areas with standard tiles, 10% waste is typical. For complex areas, diagonal patterns, or irregularly shaped tiles, add 15-20%."
        },
        {
          question: "How do I choose the right grout line size?",
          answer: "The appropriate grout line size depends on several factors: tile type (ceramic, porcelain, natural stone), tile size (larger tiles often need wider grout lines), location (floor vs. wall), and desired aesthetic. Common sizes range from 1/16\" for precision installations to 1/4\" for rustic looks or floor tiles."
        },
        {
          question: "How much grout do I need for my tile project?",
          answer: "Grout needs vary based on tile size, grout line width, and depth. Generally, smaller tiles and wider grout lines require more grout. For narrow grout lines (1/16\"), you'll need about 1 pound per 10 sq ft. For medium lines (1/8\"), about 1.5 pounds, and for wide lines (1/4\"), about 2 pounds per 10 sq ft."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/tile-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Area Dimensions</h4>
            
            <CalculatorInput
              id="area-length"
              label="Area Length"
              type="number"
              value={areaLength}
              onChange={(value) => setAreaLength(parseFloat(value) || 0)}
              min={0.1}
              step={0.1}
              suffix=" ft"
              helperText="Length of the area to be tiled in feet"
            />
            
            <CalculatorInput
              id="area-width"
              label="Area Width"
              type="number"
              value={areaWidth}
              onChange={(value) => setAreaWidth(parseFloat(value) || 0)}
              min={0.1}
              step={0.1}
              suffix=" ft"
              helperText="Width of the area to be tiled in feet"
              className="mt-3"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Tile Information</h4>
            
            <CalculatorInput
              id="tile-length"
              label="Tile Length"
              type="number"
              value={tileLength}
              onChange={(value) => setTileLength(parseFloat(value) || 0)}
              min={0.1}
              step={0.1}
              suffix=" inches"
              helperText="Length of one tile in inches"
            />
            
            <CalculatorInput
              id="tile-width"
              label="Tile Width"
              type="number"
              value={tileWidth}
              onChange={(value) => setTileWidth(parseFloat(value) || 0)}
              min={0.1}
              step={0.1}
              suffix=" inches"
              helperText="Width of one tile in inches"
              className="mt-3"
            />
            
            <CalculatorInput
              id="grout-size"
              label="Grout Line Size"
              type="number"
              value={groutSize}
              onChange={(value) => setGroutSize(parseFloat(value) || 0)}
              min={0}
              step={0.0625}
              suffix=" inches"
              helperText="Width of grout lines in inches (e.g., 0.25 for 1/4\")"
              className="mt-3"
            />
          </div>
          
          <CalculatorInput
            id="tiles-per-box"
            label="Tiles Per Box"
            type="number"
            value={tilesPerBox}
            onChange={(value) => setTilesPerBox(parseFloat(value) || 0)}
            min={1}
            step={1}
            helperText="Number of tiles in each box"
          />
          
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
            helperText="Add extra for cuts, breaks, and future replacements"
          />
          
          <Button 
            onClick={calculateTiles}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Tile Needs
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Tile Requirements</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Area to be Tiled"
                    value={`${results.areaSquareFeet.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Individual Tile Size"
                    value={`${results.tileSizeSquareFeet.toFixed(2)} sq ft`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Tiles Needed"
                    value={`${results.tilesNeeded} tiles`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Boxes Needed"
                    value={`${results.boxesNeeded} boxes`}
                    icon={<Construction className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Grout Needed"
                    value={`${Math.ceil(results.groutNeeded)} lbs`}
                    icon={<Construction className="h-5 w-5" />}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For your {areaLength} × {areaWidth} ft area using {tileLength}" × {tileWidth}" tiles:</p>
                  <p className="mt-2">You'll need <strong>{results.tilesNeeded} tiles</strong> ({results.boxesNeeded} boxes at {tilesPerBox} tiles per box).</p>
                  <p className="mt-2">Approximately <strong>{Math.ceil(results.groutNeeded)} pounds</strong> of grout will be required for {groutSize}" grout lines.</p>
                  <p className="mt-2">This calculation includes {wastePercent}% extra for waste.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default TileCalculator;
