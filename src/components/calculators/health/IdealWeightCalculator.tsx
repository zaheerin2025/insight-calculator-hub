
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorInput from '@/components/ui/calculator-input';
import ResultDisplay from '../ResultDisplay';
import { Calculator, Scale } from 'lucide-react';
import { toast } from 'sonner';

const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [bodyFrame, setBodyFrame] = useState<string>("medium");
  
  // Metric measurements
  const [heightCm, setHeightCm] = useState<number>(175);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(70);
  
  // Imperial measurements
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [currentWeightLbs, setCurrentWeightLbs] = useState<number>(154);
  
  // Results
  const [idealWeightHamwi, setIdealWeightHamwi] = useState<number | null>(null);
  const [idealWeightDevine, setIdealWeightDevine] = useState<number | null>(null);
  const [idealWeightRobinson, setIdealWeightRobinson] = useState<number | null>(null);
  const [idealWeightMiller, setIdealWeightMiller] = useState<number | null>(null);
  const [idealWeightBMI, setIdealWeightBMI] = useState<number | null>(null);
  const [weightStatus, setWeightStatus] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateIdealWeight = () => {
    try {
      // Convert imperial to metric if needed
      let heightInCm = heightCm;
      let currentWeight = currentWeightKg;
      
      if (units === 'imperial') {
        heightInCm = ((heightFeet * 12) + heightInches) * 2.54; // inches to cm
        currentWeight = currentWeightLbs * 0.453592; // lbs to kg
      }
      
      const heightInMeters = heightInCm / 100;
      const heightInInches = heightInCm / 2.54;
      
      // Calculate ideal weight using different formulas
      
      // Hamwi Formula
      let hamwiWeight = 0;
      if (gender === 'male') {
        hamwiWeight = 48 + 2.7 * (heightInInches - 60);
      } else {
        hamwiWeight = 45.5 + 2.2 * (heightInInches - 60);
      }
      
      // Adjust for body frame
      switch (bodyFrame) {
        case 'small':
          hamwiWeight = hamwiWeight * 0.9;
          break;
        case 'large':
          hamwiWeight = hamwiWeight * 1.1;
          break;
      }
      
      // Devine Formula
      let devineWeight = 0;
      if (gender === 'male') {
        devineWeight = 50 + 2.3 * (heightInInches - 60);
      } else {
        devineWeight = 45.5 + 2.3 * (heightInInches - 60);
      }
      
      // Robinson Formula
      let robinsonWeight = 0;
      if (gender === 'male') {
        robinsonWeight = 52 + 1.9 * (heightInInches - 60);
      } else {
        robinsonWeight = 49 + 1.7 * (heightInInches - 60);
      }
      
      // Miller Formula
      let millerWeight = 0;
      if (gender === 'male') {
        millerWeight = 56.2 + 1.41 * (heightInInches - 60);
      } else {
        millerWeight = 53.1 + 1.36 * (heightInInches - 60);
      }
      
      // BMI-based ideal weight (BMI of 22 is considered ideal)
      const bmiWeight = 22 * (heightInMeters * heightInMeters);
      
      // Calculate weight status
      const percentDifference = ((currentWeight - bmiWeight) / bmiWeight) * 100;
      let status = '';
      
      if (percentDifference < -10) {
        status = 'Underweight';
      } else if (percentDifference >= -10 && percentDifference <= 10) {
        status = 'Ideal Weight';
      } else if (percentDifference > 10 && percentDifference <= 20) {
        status = 'Slightly Overweight';
      } else if (percentDifference > 20 && percentDifference <= 30) {
        status = 'Overweight';
      } else {
        status = 'Obesity';
      }
      
      setIdealWeightHamwi(hamwiWeight);
      setIdealWeightDevine(devineWeight);
      setIdealWeightRobinson(robinsonWeight);
      setIdealWeightMiller(millerWeight);
      setIdealWeightBMI(bmiWeight);
      setWeightStatus(status);
      setIsCalculated(true);
      toast.success('Ideal weight calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const getWeightStatusColor = (status: string): string => {
    switch (status) {
      case 'Underweight':
        return 'text-blue-600';
      case 'Ideal Weight':
        return 'text-green-600';
      case 'Slightly Overweight':
        return 'text-yellow-600';
      case 'Overweight':
        return 'text-orange-500';
      case 'Obesity':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const convertWeight = (weight: number | null): string => {
    if (weight === null) return '0';
    
    if (units === 'metric') {
      return `${weight.toFixed(1)} kg`;
    } else {
      const lbs = weight * 2.20462;
      return `${lbs.toFixed(1)} lbs`;
    }
  };

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal weight based on height, age, gender, and body frame."
      intro="This calculator uses several standard formulas to estimate your ideal weight based on your height, gender, and body frame."
      formula={
        <div>
          <p className="mb-4">This calculator uses several standard formulas to estimate ideal weight:</p>
          
          <h3 className="font-semibold mt-4">1. Hamwi Formula (1964)</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><strong>For Men:</strong> <code>Ideal Weight (kg) = 48 + 2.7 × (Height(in) - 60)</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>Ideal Weight (kg) = 45.5 + 2.2 × (Height(in) - 60)</code></p>
            <p className="mt-2">With adjustments for frame size: small frame (−10%), large frame (+10%)</p>
          </div>
          
          <h3 className="font-semibold mt-4">2. Devine Formula (1974)</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><strong>For Men:</strong> <code>Ideal Weight (kg) = 50 + 2.3 × (Height(in) - 60)</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>Ideal Weight (kg) = 45.5 + 2.3 × (Height(in) - 60)</code></p>
          </div>
          
          <h3 className="font-semibold mt-4">3. Robinson Formula (1983)</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><strong>For Men:</strong> <code>Ideal Weight (kg) = 52 + 1.9 × (Height(in) - 60)</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>Ideal Weight (kg) = 49 + 1.7 × (Height(in) - 60)</code></p>
          </div>
          
          <h3 className="font-semibold mt-4">4. Miller Formula (1983)</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><strong>For Men:</strong> <code>Ideal Weight (kg) = 56.2 + 1.41 × (Height(in) - 60)</code></p>
            <p className="mt-2"><strong>For Women:</strong> <code>Ideal Weight (kg) = 53.1 + 1.36 × (Height(in) - 60)</code></p>
          </div>
          
          <h3 className="font-semibold mt-4">5. BMI-Based Formula</h3>
          <div className="bg-muted p-4 rounded-md my-2 overflow-x-auto">
            <p><code>Ideal Weight (kg) = 22 × Height(m)²</code></p>
            <p className="mt-2">Based on a BMI of 22, which is in the middle of the healthy BMI range (18.5-24.9)</p>
          </div>
        </div>
      }
      faq={[
        {
          question: "How do I determine my body frame size?",
          answer: "A simple method is to wrap your thumb and middle finger around your wrist. If they overlap, you likely have a small frame. If they touch, you have a medium frame. If they don't meet, you likely have a large frame. Another method is to divide your height in cm by your wrist circumference in cm. Above 10.4 indicates a small frame, 9.6-10.4 indicates a medium frame, and below 9.6 indicates a large frame."
        },
        {
          question: "Why do the different formulas give different results?",
          answer: "Each formula was developed at different times by different researchers, and they emphasize different aspects of body composition. Some formulas are more appropriate for certain populations. The average of several formulas may provide a more balanced estimate."
        },
        {
          question: "Is ideal weight the same as healthy weight?",
          answer: "Not necessarily. 'Ideal weight' traditionally refers to weight associated with lowest mortality, while 'healthy weight' encompasses a broader range. Many healthy people fall outside their calculated ideal weight. Other factors like muscle mass, bone density, and individual health markers are important to consider."
        },
        {
          question: "How important is it to reach my ideal weight?",
          answer: "While these calculations provide a reference point, they don't account for individual differences in body composition, muscle mass, or specific health considerations. Focus on overall health habits rather than reaching a specific number. Consult with healthcare professionals for personalized advice."
        }
      ]}
      canonicalUrl="https://calculators-hub.com/calculators/health/ideal-weight-calculator"
    >
      <div className="space-y-6">
        <Tabs value={units} onValueChange={(value) => setUnits(value as 'metric' | 'imperial')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (ft/in, lbs)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metric" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Body Frame</Label>
                <Select value={bodyFrame} onValueChange={setBodyFrame}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small Frame</SelectItem>
                    <SelectItem value="medium">Medium Frame</SelectItem>
                    <SelectItem value="large">Large Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <CalculatorInput
                id="height-metric"
                label="Height"
                type="number"
                value={heightCm}
                onChange={(value) => setHeightCm(parseFloat(value) || 0)}
                suffix="cm"
                min={100}
                max={250}
                helperText="Your height in centimeters"
              />
              
              <CalculatorInput
                id="weight-metric"
                label="Current Weight"
                type="number"
                value={currentWeightKg}
                onChange={(value) => setCurrentWeightKg(parseFloat(value) || 0)}
                suffix="kg"
                min={30}
                max={300}
                helperText="Your current weight in kilograms"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="imperial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Body Frame</Label>
                <Select value={bodyFrame} onValueChange={setBodyFrame}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small Frame</SelectItem>
                    <SelectItem value="medium">Medium Frame</SelectItem>
                    <SelectItem value="large">Large Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <CalculatorInput
                  id="height-feet"
                  label="Height (feet)"
                  type="number"
                  value={heightFeet}
                  onChange={(value) => setHeightFeet(parseInt(value) || 0)}
                  suffix="ft"
                  min={3}
                  max={8}
                  helperText="Feet"
                />
                
                <CalculatorInput
                  id="height-inches"
                  label="Height (inches)"
                  type="number"
                  value={heightInches}
                  onChange={(value) => setHeightInches(parseInt(value) || 0)}
                  suffix="in"
                  min={0}
                  max={11}
                  helperText="Inches"
                />
              </div>
              
              <CalculatorInput
                id="weight-imperial"
                label="Current Weight"
                type="number"
                value={currentWeightLbs}
                onChange={(value) => setCurrentWeightLbs(parseFloat(value) || 0)}
                suffix="lbs"
                min={60}
                max={660}
                helperText="Your current weight in pounds"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateIdealWeight}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Ideal Weight
          </Button>
        </div>
        
        {isCalculated && idealWeightBMI !== null && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultDisplay
                label="Current Weight"
                value={units === 'metric' ? `${currentWeightKg.toFixed(1)} kg` : `${currentWeightLbs.toFixed(1)} lbs`}
                icon={<Scale className="h-5 w-5" />}
              />
              
              <ResultDisplay
                label="Weight Status"
                value={weightStatus}
                description="Based on BMI method"
                icon={<Calculator className="h-5 w-5" />}
                customValueClass={getWeightStatusColor(weightStatus)}
              />
            </div>
            
            <div className="mt-6 p-6 border rounded-md bg-muted/20">
              <h3 className="font-semibold mb-4">Ideal Weight Range (different methods)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-muted-foreground">BMI Method</p>
                  <p className="text-xl font-medium">{convertWeight(idealWeightBMI)}</p>
                  <p className="text-xs text-muted-foreground">Based on a BMI of 22</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Hamwi Formula</p>
                  <p className="text-xl font-medium">{convertWeight(idealWeightHamwi)}</p>
                  <p className="text-xs text-muted-foreground">Adjusted for {bodyFrame} frame</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Devine Formula</p>
                  <p className="text-xl font-medium">{convertWeight(idealWeightDevine)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Robinson Formula</p>
                  <p className="text-xl font-medium">{convertWeight(idealWeightRobinson)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Miller Formula</p>
                  <p className="text-xl font-medium">{convertWeight(idealWeightMiller)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-xl font-medium font-bold">
                    {convertWeight((idealWeightHamwi + idealWeightDevine + idealWeightRobinson + idealWeightMiller + idealWeightBMI) / 5)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Difference from Ideal Weight</h4>
                <p className="text-sm">
                  {(() => {
                    // Calculate average ideal weight
                    const avgIdealWeight = (idealWeightHamwi + idealWeightDevine + idealWeightRobinson + idealWeightMiller + idealWeightBMI) / 5;
                    const currentWeight = units === 'metric' ? currentWeightKg : currentWeightLbs / 2.20462; // Convert to kg
                    const difference = currentWeight - avgIdealWeight;
                    const diffString = Math.abs(difference).toFixed(1);
                    const unit = units === 'metric' ? 'kg' : 'lbs';
                    const diffInSelectedUnit = units === 'metric' ? Math.abs(difference) : Math.abs(difference) * 2.20462;
                    
                    if (Math.abs(difference) < 1) {
                      return <span className="text-green-600">You are at your ideal weight!</span>;
                    } else if (difference < 0) {
                      return <span>You are <span className="font-medium">{diffInSelectedUnit.toFixed(1)} {unit}</span> below your ideal weight.</span>;
                    } else {
                      return <span>You are <span className="font-medium">{diffInSelectedUnit.toFixed(1)} {unit}</span> above your ideal weight.</span>;
                    }
                  })()}
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Note: These calculations are estimates and should be used as general guidelines only. Many factors influence healthy weight including age, muscle mass, bone density, and overall body composition.</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default IdealWeightCalculator;
