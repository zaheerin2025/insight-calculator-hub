
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Construction, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConcreteCalculator: React.FC = () => {
  // Tab 1: Rectangular Slab
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [depth, setDepth] = useState<number>(0.5); // in feet
  const [rectangleResults, setRectangleResults] = useState<{
    cubicFeet: number;
    cubicYards: number;
    bags: number;
  } | null>(null);
  
  // Tab 2: Circular Slab
  const [diameter, setDiameter] = useState<number>(10);
  const [circleDepth, setCircleDepth] = useState<number>(0.5); // in feet
  const [circleResults, setCircleResults] = useState<{
    cubicFeet: number;
    cubicYards: number;
    bags: number;
  } | null>(null);
  
  // Tab 3: Cylindrical Column
  const [columnDiameter, setColumnDiameter] = useState<number>(1);
  const [columnHeight, setColumnHeight] = useState<number>(8);
  const [columnResults, setColumnResults] = useState<{
    cubicFeet: number;
    cubicYards: number;
    bags: number;
  } | null>(null);
  
  // Calculate concrete for rectangular slab
  const calculateRectangle = () => {
    try {
      if (
        isNaN(length) || isNaN(width) || isNaN(depth) ||
        length <= 0 || width <= 0 || depth <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const cubicFeet = length * width * depth;
      const cubicYards = cubicFeet / 27; // 1 cubic yard = 27 cubic feet
      const bags = Math.ceil(cubicYards * 40); // ~40 bags per cubic yard (80lb bags)
      
      setRectangleResults({
        cubicFeet,
        cubicYards,
        bags
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate concrete for circular slab
  const calculateCircle = () => {
    try {
      if (
        isNaN(diameter) || isNaN(circleDepth) ||
        diameter <= 0 || circleDepth <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const radius = diameter / 2;
      const area = Math.PI * radius * radius;
      const cubicFeet = area * circleDepth;
      const cubicYards = cubicFeet / 27;
      const bags = Math.ceil(cubicYards * 40);
      
      setCircleResults({
        cubicFeet,
        cubicYards,
        bags
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate concrete for cylindrical column
  const calculateColumn = () => {
    try {
      if (
        isNaN(columnDiameter) || isNaN(columnHeight) ||
        columnDiameter <= 0 || columnHeight <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const radius = columnDiameter / 2;
      const volume = Math.PI * radius * radius * columnHeight;
      const cubicYards = volume / 27;
      const bags = Math.ceil(cubicYards * 40);
      
      setColumnResults({
        cubicFeet: volume,
        cubicYards,
        bags
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
    "name": "Concrete Calculator",
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
      title="Concrete Calculator"
      description="Calculate the amount of concrete needed for your construction project based on dimensions."
      intro="Our concrete calculator helps you estimate the volume of concrete needed for various types of projects, including rectangular slabs, circular slabs, and cylindrical columns."
      formula={
        <div>
          <p>The concrete volume calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Rectangular Slab:</strong></p>
            <code>Volume = Length × Width × Depth</code>
            
            <p className="mt-3"><strong>Circular Slab:</strong></p>
            <code>Volume = π × (Diameter ÷ 2)² × Depth</code>
            
            <p className="mt-3"><strong>Cylindrical Column:</strong></p>
            <code>Volume = π × (Diameter ÷ 2)² × Height</code>
            
            <p className="mt-3"><strong>Conversion to Cubic Yards:</strong></p>
            <code>Cubic Yards = Cubic Feet ÷ 27</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How many bags of concrete do I need?",
          answer: "For an 80lb bag of concrete mix, you'll need approximately 40 bags per cubic yard. This calculator provides an estimate based on this ratio. For more precise measurements, check the specific yield information on your concrete mix packaging."
        },
        {
          question: "What's the difference between concrete, cement, and mortar?",
          answer: "Concrete is a mixture of cement, aggregates (sand and gravel), and water. Cement is just one component of concrete and acts as the binding agent. Mortar is a mixture of cement, fine sand, and water, used primarily to bind bricks or blocks together."
        },
        {
          question: "Should I add extra concrete to my calculation?",
          answer: "Yes, it's generally recommended to add about 10% extra to your calculated amount to account for potential spillage, uneven ground, and other factors that might require more concrete than the exact mathematical calculation."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/construction/concrete-calculator"
    >
      <Tabs defaultValue="rectangular" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rectangular">Rectangular Slab</TabsTrigger>
          <TabsTrigger value="circular">Circular Slab</TabsTrigger>
          <TabsTrigger value="column">Column</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Rectangular Slab */}
        <TabsContent value="rectangular" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="length"
                label="Length"
                type="number"
                value={length}
                onChange={(value) => setLength(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Length of the slab in feet"
              />
              
              <CalculatorInput
                id="width"
                label="Width"
                type="number"
                value={width}
                onChange={(value) => setWidth(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Width of the slab in feet"
              />
              
              <CalculatorInput
                id="depth"
                label="Thickness/Depth"
                type="number"
                value={depth}
                onChange={(value) => setDepth(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Thickness of the slab in feet (e.g., 0.33 for 4 inches)"
              />
              
              <Button 
                onClick={calculateRectangle}
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
                    <h3 className="text-lg font-medium mb-4">Concrete Required</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Volume"
                        value={`${rectangleResults.cubicFeet.toFixed(2)} ft³`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Cubic Yards"
                        value={`${rectangleResults.cubicYards.toFixed(2)} yd³`}
                        icon={<Construction className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Bags of Concrete (80lb)"
                        value={`${rectangleResults.bags} bags`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>This calculation is for a rectangular slab measuring {length} ft × {width} ft × {depth} ft.</p>
                      <p className="mt-2">We recommend adding 10% extra to account for spillage and uneven ground.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Circular Slab */}
        <TabsContent value="circular" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="diameter"
                label="Diameter"
                type="number"
                value={diameter}
                onChange={(value) => setDiameter(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Diameter of the circular slab in feet"
              />
              
              <CalculatorInput
                id="circle-depth"
                label="Thickness/Depth"
                type="number"
                value={circleDepth}
                onChange={(value) => setCircleDepth(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Thickness of the slab in feet (e.g., 0.33 for 4 inches)"
              />
              
              <Button 
                onClick={calculateCircle}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {circleResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Concrete Required</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Volume"
                        value={`${circleResults.cubicFeet.toFixed(2)} ft³`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Cubic Yards"
                        value={`${circleResults.cubicYards.toFixed(2)} yd³`}
                        icon={<Construction className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Bags of Concrete (80lb)"
                        value={`${circleResults.bags} bags`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>This calculation is for a circular slab with diameter {diameter} ft and thickness {circleDepth} ft.</p>
                      <p className="mt-2">We recommend adding 10% extra to account for spillage and uneven ground.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 3: Column */}
        <TabsContent value="column" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="column-diameter"
                label="Diameter"
                type="number"
                value={columnDiameter}
                onChange={(value) => setColumnDiameter(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Diameter of the column in feet"
              />
              
              <CalculatorInput
                id="column-height"
                label="Height"
                type="number"
                value={columnHeight}
                onChange={(value) => setColumnHeight(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" ft"
                helperText="Height of the column in feet"
              />
              
              <Button 
                onClick={calculateColumn}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
            
            <div>
              {columnResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Concrete Required</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Volume"
                        value={`${columnResults.cubicFeet.toFixed(2)} ft³`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Cubic Yards"
                        value={`${columnResults.cubicYards.toFixed(2)} yd³`}
                        icon={<Construction className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Bags of Concrete (80lb)"
                        value={`${columnResults.bags} bags`}
                        icon={<Construction className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>This calculation is for a cylindrical column with diameter {columnDiameter} ft and height {columnHeight} ft.</p>
                      <p className="mt-2">We recommend adding 10% extra to account for spillage and wastage.</p>
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

export default ConcreteCalculator;
