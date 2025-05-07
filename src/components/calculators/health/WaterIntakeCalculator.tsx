
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import ResultDisplay from '../ResultDisplay';
import { Calculator } from 'lucide-react';
import { toast } from 'sonner';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [climate, setClimate] = useState<string>("moderate");
  const [age, setAge] = useState<number>(30);
  
  // Results
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const [waterIntakeOz, setWaterIntakeOz] = useState<number | null>(null);
  const [waterIntakeCups, setWaterIntakeCups] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateWaterIntake = () => {
    try {
      // Convert weight to kg if in lbs
      let weightInKg = weight;
      if (weightUnit === 'lbs') {
        weightInKg = weight * 0.453592;
      }
      
      // Base calculation: 30-35mL per kg of body weight
      let waterInLiters = weightInKg * 0.033; // 33mL/kg as base
      
      // Activity level adjustment
      const activityMultiplier = {
        sedentary: 1.0,
        light: 1.1,
        moderate: 1.2,
        active: 1.3,
        veryActive: 1.4
      };
      
      waterInLiters *= activityMultiplier[activityLevel as keyof typeof activityMultiplier];
      
      // Climate adjustment
      const climateMultiplier = {
        cold: 0.9,
        moderate: 1.0,
        hot: 1.1,
        veryHot: 1.2
      };
      
      waterInLiters *= climateMultiplier[climate as keyof typeof climateMultiplier];
      
      // Age adjustment (subtle reduction for older adults)
      if (age > 55) {
        waterInLiters *= 0.95;
      } else if (age > 65) {
        waterInLiters *= 0.9;
      }
      
      // Conversion to other units
      const waterInOz = waterInLiters * 33.814; // liters to fluid ounces
      const waterInCups = waterInOz / 8; // fluid ounces to cups
      
      setWaterIntake(parseFloat(waterInLiters.toFixed(1)));
      setWaterIntakeOz(Math.round(waterInOz));
      setWaterIntakeCups(Math.round(waterInCups));
      setIsCalculated(true);
      toast.success('Water intake calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const getActivityLevelDescription = (level: string): string => {
    switch (level) {
      case 'sedentary':
        return "Little to no exercise, desk job";
      case 'light':
        return "Light exercise 1-3 days/week";
      case 'moderate':
        return "Moderate exercise 3-5 days/week";
      case 'active':
        return "Hard exercise 6-7 days/week";
      case 'veryActive':
        return "Very hard exercise, physical job, or training twice a day";
      default:
        return "";
    }
  };
  
  const getClimateDescription = (climate: string): string => {
    switch (climate) {
      case 'cold':
        return "Cold (below 50°F/10°C)";
      case 'moderate':
        return "Moderate (50-75°F/10-24°C)";
      case 'hot':
        return "Hot (75-90°F/24-32°C)";
      case 'veryHot':
        return "Very hot (above 90°F/32°C)";
      default:
        return "";
    }
  };

  return (
    <CalculatorLayout
      title="Water Intake Calculator"
      description="Calculate your recommended daily water intake based on weight, activity level, and climate."
      intro="Proper hydration is essential for optimal health. This calculator estimates your recommended daily water intake based on your individual factors such as weight, physical activity, and climate conditions."
      formula={
        <div>
          <p className="mb-4">This calculator uses a personalized approach to estimate your daily water needs:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p><strong>Base Formula:</strong> <code>Water (L) = Weight (kg) × 0.033</code></p>
            <p className="mt-3"><strong>With Adjustments:</strong></p>
            <p><code>Water (L) = Weight (kg) × 0.033 × Activity Factor × Climate Factor × Age Factor</code></p>
          </div>
          
          <p className="mt-4">The formula includes these adjustment factors:</p>
          
          <div className="mt-2 space-y-3">
            <div>
              <p className="font-medium">Activity Level Factors:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Sedentary: 1.0</li>
                <li>Light activity: 1.1</li>
                <li>Moderate activity: 1.2</li>
                <li>Active: 1.3</li>
                <li>Very active: 1.4</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Climate Factors:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Cold climate: 0.9</li>
                <li>Moderate climate: 1.0</li>
                <li>Hot climate: 1.1</li>
                <li>Very hot climate: 1.2</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Age Factors:</p>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Under 55 years: 1.0</li>
                <li>55-65 years: 0.95</li>
                <li>Over 65 years: 0.9</li>
              </ul>
            </div>
          </div>
        </div>
      }
      faq={[
        {
          question: "Why is water intake important?",
          answer: "Water is essential for nearly every bodily function, including regulating body temperature, lubricating joints, delivering nutrients to cells, flushing waste, and maintaining organ function. Proper hydration improves energy, cognitive function, digestive health, and skin appearance."
        },
        {
          question: "How accurate is this water intake calculator?",
          answer: "This calculator provides an estimate based on weight, activity level, and climate. Individual needs may vary based on health conditions, medications, altitude, pregnancy, breastfeeding, and diet. It's best used as a starting point rather than a precise prescription."
        },
        {
          question: "Do other beverages count toward my daily water intake?",
          answer: "Yes, other beverages contribute to hydration, but with varying effectiveness. Water is ideal. Tea, coffee, and milk provide good hydration but may have other effects (caffeine, calories). Sugary drinks and alcohol are less hydrating. A good rule of thumb is to get at least half your fluid intake from plain water."
        },
        {
          question: "How can I tell if I'm drinking enough water?",
          answer: "Signs of adequate hydration include pale yellow urine (not colorless or dark), regular urination (every 2-4 hours), rarely feeling thirsty, good skin elasticity, and stable energy levels. Pay attention to your body's signals rather than just following general guidelines."
        }
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="weight">Weight</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{weight} {weightUnit}</span>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Slider 
                id="weight"
                min={weightUnit === 'kg' ? 30 : 66}
                max={weightUnit === 'kg' ? 150 : 330}
                step={weightUnit === 'kg' ? 1 : 2}
                value={[weight]}
                onValueChange={(value) => setWeight(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                min={1}
                max={120}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger id="activityLevel">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light Activity</SelectItem>
                  <SelectItem value="moderate">Moderate Activity</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="veryActive">Very Active</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{getActivityLevelDescription(activityLevel)}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="climate">Climate</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger id="climate">
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold">Cold</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="veryHot">Very Hot</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{getClimateDescription(climate)}</p>
            </div>
            
            <Button onClick={calculateWaterIntake} className="w-full">Calculate Water Intake</Button>
          </div>
          
          <div>
            {isCalculated && waterIntake !== null ? (
              <div className="space-y-6">
                <ResultDisplay
                  label="Recommended Daily Water Intake"
                  value={`${waterIntake} liters`}
                  description="Optimal hydration based on your body and activity"
                  icon={<span className="text-2xl">💧</span>}
                  isHighlighted={true}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultDisplay
                    label="In Fluid Ounces"
                    value={`${waterIntakeOz} fl oz`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="In Cups"
                    value={`${waterIntakeCups} cups`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                </div>
                
                <Card className="p-4 bg-muted/30">
                  <h4 className="font-medium mb-2">Hydration Tips</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Start your day with a glass of water</li>
                    <li>• Carry a reusable water bottle</li>
                    <li>• Set reminders to drink throughout the day</li>
                    <li>• Eat water-rich foods (fruits, vegetables)</li>
                    <li>• Drink before, during, and after exercise</li>
                    <li>• Increase intake during hot weather</li>
                  </ul>
                </Card>
                
                <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-900">
                  <h4 className="font-medium mb-2 flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    <span>Important Note</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    This is a general recommendation. Actual water needs may vary due to medical conditions, 
                    medications, pregnancy, and other factors. Consult your healthcare provider for personalized advice.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">💧</span>
                  <h3 className="text-lg font-medium mb-2">Water Intake Recommendation</h3>
                  <p className="text-muted-foreground">
                    Enter your details and click calculate to see your recommended daily water intake.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default WaterIntakeCalculator;
