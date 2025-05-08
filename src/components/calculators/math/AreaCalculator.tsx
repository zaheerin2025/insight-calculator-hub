
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator } from 'lucide-react';

const AreaCalculator: React.FC = () => {
  // Rectangle
  const [rectangleLength, setRectangleLength] = useState<number>(10);
  const [rectangleWidth, setRectangleWidth] = useState<number>(5);
  const [rectangleArea, setRectangleArea] = useState<number | null>(null);
  
  // Circle
  const [circleRadius, setCircleRadius] = useState<number>(5);
  const [circleArea, setCircleArea] = useState<number | null>(null);
  
  // Triangle
  const [triangleBase, setTriangleBase] = useState<number>(10);
  const [triangleHeight, setTriangleHeight] = useState<number>(8);
  const [triangleArea, setTriangleArea] = useState<number | null>(null);
  
  // Square
  const [squareSide, setSquareSide] = useState<number>(6);
  const [squareArea, setSquareArea] = useState<number | null>(null);
  
  // Calculate rectangle area
  const calculateRectangleArea = () => {
    try {
      if (isNaN(rectangleLength) || isNaN(rectangleWidth) || rectangleLength <= 0 || rectangleWidth <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const area = rectangleLength * rectangleWidth;
      setRectangleArea(area);
      toast.success('Rectangle area calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate circle area
  const calculateCircleArea = () => {
    try {
      if (isNaN(circleRadius) || circleRadius <= 0) {
        toast.error('Please enter a valid positive radius');
        return;
      }
      
      const area = Math.PI * Math.pow(circleRadius, 2);
      setCircleArea(area);
      toast.success('Circle area calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate triangle area
  const calculateTriangleArea = () => {
    try {
      if (isNaN(triangleBase) || isNaN(triangleHeight) || triangleBase <= 0 || triangleHeight <= 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const area = 0.5 * triangleBase * triangleHeight;
      setTriangleArea(area);
      toast.success('Triangle area calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate square area
  const calculateSquareArea = () => {
    try {
      if (isNaN(squareSide) || squareSide <= 0) {
        toast.error('Please enter a valid positive side length');
        return;
      }
      
      const area = Math.pow(squareSide, 2);
      setSquareArea(area);
      toast.success('Square area calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Area Calculator",
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
      title="Area Calculator"
      description="Calculate the area of various 2D shapes including rectangles, circles, triangles, and squares with our easy-to-use calculator."
      intro="Our area calculator helps you determine the area of different geometric shapes with precision. Perfect for students, engineers, architects, and DIY enthusiasts."
      formula={
        <div>
          <p>Area calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Rectangle:</strong></p>
            <code>Area = Length × Width</code>
            
            <p className="mt-3"><strong>Circle:</strong></p>
            <code>Area = π × Radius²</code>
            
            <p className="mt-3"><strong>Triangle:</strong></p>
            <code>Area = (Base × Height) ÷ 2</code>
            
            <p className="mt-3"><strong>Square:</strong></p>
            <code>Area = Side²</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What units should I use for my measurements?",
          answer: "Any unit of length can be used for your measurements, but make sure to use the same unit for all dimensions of a shape. Your result will be in square units (e.g., cm², m², ft², etc.)."
        },
        {
          question: "How do I calculate the area of an irregular shape?",
          answer: "For irregular shapes, you can break down the shape into smaller regular shapes (rectangles, triangles, etc.), calculate the area of each part separately, and then add them together."
        },
        {
          question: "Why is area calculation important?",
          answer: "Area calculations are essential for many practical applications such as determining the amount of materials needed for construction, calculating paint coverage, planning landscaping, or determining property size."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/math/area-calculator"
    >
      <Tabs defaultValue="rectangle" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
          <TabsTrigger value="circle">Circle</TabsTrigger>
          <TabsTrigger value="triangle">Triangle</TabsTrigger>
          <TabsTrigger value="square">Square</TabsTrigger>
        </TabsList>
        
        {/* Rectangle Tab */}
        <TabsContent value="rectangle" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="rectangle-length"
                label="Length"
                type="number"
                value={rectangleLength}
                onChange={(value) => setRectangleLength(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the length of the rectangle"
              />
              
              <CalculatorInput
                id="rectangle-width"
                label="Width"
                type="number"
                value={rectangleWidth}
                onChange={(value) => setRectangleWidth(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the width of the rectangle"
              />
              
              <Button 
                onClick={calculateRectangleArea}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Area
              </Button>
            </div>
            
            <div>
              {rectangleArea !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Rectangle Area"
                      value={`${rectangleArea.toFixed(2)} square units`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>The area of a rectangle is calculated by multiplying its length by its width.</p>
                      <p className="mt-2">Area = {rectangleLength} × {rectangleWidth} = {rectangleArea.toFixed(2)} square units</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Circle Tab */}
        <TabsContent value="circle" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="circle-radius"
                label="Radius"
                type="number"
                value={circleRadius}
                onChange={(value) => setCircleRadius(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the radius of the circle"
              />
              
              <Button 
                onClick={calculateCircleArea}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Area
              </Button>
            </div>
            
            <div>
              {circleArea !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Circle Area"
                      value={`${circleArea.toFixed(2)} square units`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>The area of a circle is calculated using the formula π × r².</p>
                      <p className="mt-2">Area = π × {circleRadius}² = {circleArea.toFixed(2)} square units</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Triangle Tab */}
        <TabsContent value="triangle" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="triangle-base"
                label="Base"
                type="number"
                value={triangleBase}
                onChange={(value) => setTriangleBase(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the base length of the triangle"
              />
              
              <CalculatorInput
                id="triangle-height"
                label="Height"
                type="number"
                value={triangleHeight}
                onChange={(value) => setTriangleHeight(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the height of the triangle"
              />
              
              <Button 
                onClick={calculateTriangleArea}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Area
              </Button>
            </div>
            
            <div>
              {triangleArea !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Triangle Area"
                      value={`${triangleArea.toFixed(2)} square units`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>The area of a triangle is calculated as (base × height) ÷ 2.</p>
                      <p className="mt-2">Area = ({triangleBase} × {triangleHeight}) ÷ 2 = {triangleArea.toFixed(2)} square units</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Square Tab */}
        <TabsContent value="square" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="square-side"
                label="Side Length"
                type="number"
                value={squareSide}
                onChange={(value) => setSquareSide(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                helperText="Enter the side length of the square"
              />
              
              <Button 
                onClick={calculateSquareArea}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate Area
              </Button>
            </div>
            
            <div>
              {squareArea !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Result</h3>
                    
                    <ResultDisplay
                      label="Square Area"
                      value={`${squareArea.toFixed(2)} square units`}
                      icon={<Calculator className="h-5 w-5" />}
                      isHighlighted={true}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>The area of a square is calculated by squaring the side length.</p>
                      <p className="mt-2">Area = {squareSide}² = {squareArea.toFixed(2)} square units</p>
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

export default AreaCalculator;
