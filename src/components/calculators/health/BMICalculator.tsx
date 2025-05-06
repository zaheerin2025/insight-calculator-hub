
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import ResultDisplay from '../ResultDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(7);
  const [weightPounds, setWeightPounds] = useState<number>(150);
  const [bmi, setBMI] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const calculateBMI = () => {
    try {
      let calculatedBMI = 0;
      
      if (units === 'metric') {
        // Check if height and weight are valid
        if (height <= 0 || weight <= 0) {
          toast.error('Please enter valid height and weight values');
          return;
        }
        
        // BMI formula: weight (kg) / (height (m))^2
        const heightInMeters = height / 100;
        calculatedBMI = weight / (heightInMeters * heightInMeters);
      } else {
        // Check if height and weight are valid
        if ((heightFeet <= 0 && heightInches <= 0) || weightPounds <= 0) {
          toast.error('Please enter valid height and weight values');
          return;
        }
        
        // BMI formula (imperial): (weight (lbs) * 703) / (height (inches))^2
        const heightInInchesTotal = heightFeet * 12 + heightInches;
        calculatedBMI = (weightPounds * 703) / (heightInInchesTotal * heightInInchesTotal);
      }
      
      // Determine BMI category
      let bmiCategory = '';
      if (calculatedBMI < 18.5) {
        bmiCategory = 'Underweight';
      } else if (calculatedBMI < 25) {
        bmiCategory = 'Normal weight';
      } else if (calculatedBMI < 30) {
        bmiCategory = 'Overweight';
      } else {
        bmiCategory = 'Obese';
      }
      
      setBMI(calculatedBMI);
      setCategory(bmiCategory);
      setIsCalculated(true);
      toast.success('BMI calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-600';
      case 'Normal weight':
        return 'text-green-600';
      case 'Overweight':
        return 'text-yellow-600';
      case 'Obese':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI Calculator",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to assess if your weight is healthy for your height."
      intro="The Body Mass Index (BMI) is a simple calculation using a person's height and weight. It's an inexpensive and easy-to-perform method of screening for weight categories that may lead to health problems."
      formula={
        <div>
          <p>The BMI calculator uses the following formula:</p>
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p><strong>Metric:</strong> <code>BMI = weight (kg) / height² (m²)</code></p>
            <p className="mt-2"><strong>Imperial:</strong> <code>BMI = 703 × weight (lb) / height² (in²)</code></p>
          </div>
          <p className="mt-4">BMI Categories:</p>
          <ul className="list-disc ml-6 space-y-2 mt-2">
            <li><span className="text-blue-600 font-medium">Underweight:</span> BMI less than 18.5</li>
            <li><span className="text-green-600 font-medium">Normal weight:</span> BMI 18.5 to 24.9</li>
            <li><span className="text-yellow-600 font-medium">Overweight:</span> BMI 25 to 29.9</li>
            <li><span className="text-red-600 font-medium">Obese:</span> BMI 30 or greater</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What is BMI?",
          answer: "Body Mass Index (BMI) is a numerical value calculated from a person's weight and height. It provides a simple way to classify whether a person has a healthy body weight for their height."
        },
        {
          question: "Is BMI accurate for everyone?",
          answer: "BMI is a useful general indicator, but it has limitations. It doesn't account for factors like muscle mass, bone density, or body fat distribution. Athletes may have a high BMI due to muscle mass, and BMI may not be as accurate for the elderly, pregnant women, or certain ethnic groups."
        },
        {
          question: "What should I do if my BMI is outside the normal range?",
          answer: "If your BMI falls outside the normal range (18.5-24.9), consider consulting with a healthcare provider. They can provide personalized advice based on your overall health, lifestyle, and other factors beyond just BMI."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://example.com/calculators/health/bmi-calculator"
    >
      <div className="space-y-6">
        <Tabs value={units} onValueChange={(value) => setUnits(value as 'metric' | 'imperial')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
            <TabsTrigger value="imperial">Imperial (ft, lbs)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metric" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                id="height-metric"
                label="Height"
                type="number"
                value={height}
                onChange={(value) => {
                  setHeight(parseFloat(value) || 0);
                  setIsCalculated(false);
                }}
                suffix="cm"
                min={50}
                max={250}
                step={1}
                helperText="Your height in centimeters"
              />
              
              <CalculatorInput
                id="weight-metric"
                label="Weight"
                type="number"
                value={weight}
                onChange={(value) => {
                  setWeight(parseFloat(value) || 0);
                  setIsCalculated(false);
                }}
                suffix="kg"
                min={20}
                max={500}
                step={0.1}
                helperText="Your weight in kilograms"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="imperial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CalculatorInput
                id="height-feet"
                label="Height (feet)"
                type="number"
                value={heightFeet}
                onChange={(value) => {
                  setHeightFeet(parseFloat(value) || 0);
                  setIsCalculated(false);
                }}
                suffix="ft"
                min={1}
                max={8}
                step={1}
                helperText="Feet part of your height"
              />
              
              <CalculatorInput
                id="height-inches"
                label="Height (inches)"
                type="number"
                value={heightInches}
                onChange={(value) => {
                  setHeightInches(parseFloat(value) || 0);
                  setIsCalculated(false);
                }}
                suffix="in"
                min={0}
                max={11}
                step={1}
                helperText="Inches part of your height"
              />
              
              <CalculatorInput
                id="weight-pounds"
                label="Weight"
                type="number"
                value={weightPounds}
                onChange={(value) => {
                  setWeightPounds(parseFloat(value) || 0);
                  setIsCalculated(false);
                }}
                suffix="lbs"
                min={50}
                max={1000}
                step={1}
                helperText="Your weight in pounds"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateBMI}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate BMI
          </Button>
        </div>
        
        {isCalculated && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Your BMI Results</h2>
            <Card className="border border-muted">
              <CardContent className="p-6 text-center">
                <p className="text-xl mb-2">Your BMI is</p>
                <p className="text-4xl font-bold mb-3">{bmi.toFixed(1)}</p>
                <p className="text-lg">
                  You are in the <span className={`font-semibold ${getBMICategoryColor(category)}`}>{category}</span> range
                </p>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-blue-500 w-1/4" title="Underweight"></div>
                  <div className="bg-green-500 w-1/4" title="Normal"></div>
                  <div className="bg-yellow-500 w-1/4" title="Overweight"></div>
                  <div className="bg-red-500 w-1/4" title="Obese"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs mt-1 px-1">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default BMICalculator;
