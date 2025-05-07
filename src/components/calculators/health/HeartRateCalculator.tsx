
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const HeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(70);
  const [method, setMethod] = useState<string>("karvonen");
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    try {
      if (age < 1 || age > 120) {
        toast.error("Please enter a valid age between 1 and 120");
        return;
      }

      if (restingHeartRate < 30 || restingHeartRate > 200) {
        toast.error("Please enter a valid resting heart rate between 30 and 200");
        return;
      }

      // Maximum heart rate calculations
      const maxHRTanaka = 208 - (0.7 * age); // Tanaka formula
      const maxHRFox = 220 - age; // Fox formula (traditional)
      const maxHRGellish = 207 - (0.7 * age); // Gellish formula

      // Use average of the formulas
      const maxHR = (maxHRTanaka + maxHRFox + maxHRGellish) / 3;
      
      // Heart rate zones
      let zones: { [key: string]: { min: number; max: number } } = {};
      
      if (method === "karvonen") {
        // Karvonen Formula: (MaxHR - RestingHR) * intensity% + RestingHR
        const hrReserve = maxHR - restingHeartRate;
        zones = {
          veryLight: { min: restingHeartRate, max: Math.round(restingHeartRate + (hrReserve * 0.3)) },
          light: { min: Math.round(restingHeartRate + (hrReserve * 0.3)) + 1, max: Math.round(restingHeartRate + (hrReserve * 0.5)) },
          moderate: { min: Math.round(restingHeartRate + (hrReserve * 0.5)) + 1, max: Math.round(restingHeartRate + (hrReserve * 0.7)) },
          hard: { min: Math.round(restingHeartRate + (hrReserve * 0.7)) + 1, max: Math.round(restingHeartRate + (hrReserve * 0.85)) },
          maximum: { min: Math.round(restingHeartRate + (hrReserve * 0.85)) + 1, max: Math.round(maxHR) },
        };
      } else {
        // Percentage of Max HR method
        zones = {
          veryLight: { min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6) },
          light: { min: Math.round(maxHR * 0.6) + 1, max: Math.round(maxHR * 0.7) },
          moderate: { min: Math.round(maxHR * 0.7) + 1, max: Math.round(maxHR * 0.8) },
          hard: { min: Math.round(maxHR * 0.8) + 1, max: Math.round(maxHR * 0.9) },
          maximum: { min: Math.round(maxHR * 0.9) + 1, max: Math.round(maxHR) },
        };
      }
      
      setResults({
        maxHR: Math.round(maxHR),
        zones: zones
      });
      
      toast.success("Heart rate zones calculated successfully!");
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("An error occurred during calculation");
    }
  };

  return (
    <CalculatorLayout
      title="Heart Rate Calculator"
      description="Calculate your target heart rate zones for optimal exercise intensity based on your age and resting heart rate."
      intro="This calculator helps you determine your maximum heart rate and target heart rate zones for different exercise intensities. Knowing these zones helps optimize your workout efficiency and safety."
      formula={
        <div>
          <p className="mb-4">This calculator uses several formulas to determine maximum heart rate:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
            <p><strong>Tanaka Formula:</strong> <code>Max HR = 208 - (0.7 × Age)</code></p>
            <p className="mt-2"><strong>Fox Formula (Traditional):</strong> <code>Max HR = 220 - Age</code></p>
            <p className="mt-2"><strong>Gellish Formula:</strong> <code>Max HR = 207 - (0.7 × Age)</code></p>
          </div>
          
          <p className="mt-4 mb-2">For target heart rate zones, two methods are used:</p>
          
          <div className="bg-muted p-4 rounded-md my-4">
            <p><strong>1. Karvonen Formula (Heart Rate Reserve Method):</strong></p>
            <p className="mt-1"><code>Target HR = ((Max HR - Resting HR) × Intensity%) + Resting HR</code></p>
            
            <p className="mt-3"><strong>2. Percentage of Max HR Method:</strong></p>
            <p className="mt-1"><code>Target HR = Max HR × Intensity%</code></p>
          </div>
          
          <p className="mt-4">The heart rate zones typically follow these intensity percentages:</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>Very Light (Recovery): 50-60% of max HR</li>
            <li>Light (Endurance): 60-70% of max HR</li>
            <li>Moderate (Aerobic): 70-80% of max HR</li>
            <li>Hard (Anaerobic): 80-90% of max HR</li>
            <li>Maximum (VO2 Max): 90-100% of max HR</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "Why are there different formulas for maximum heart rate?",
          answer: "Different formulas exist because heart rates vary across populations. Research has found that the traditional '220 - age' formula (Fox formula) tends to overestimate max HR for younger people and underestimate it for older people. Newer formulas like Tanaka and Gellish were developed based on larger, more diverse studies."
        },
        {
          question: "What's the difference between the Karvonen method and percentage of max HR?",
          answer: "The Karvonen method (Heart Rate Reserve) takes your resting heart rate into account, which provides a more personalized calculation. The percentage of max HR method is simpler but less individualized. The Karvonen method is often recommended for more precise training zone calculations."
        },
        {
          question: "How do I find my resting heart rate?",
          answer: "Measure your pulse first thing in the morning before getting out of bed. Count your heartbeats for 60 seconds, or count for 30 seconds and multiply by 2. For the most accurate reading, take measurements for several consecutive days and calculate the average."
        },
        {
          question: "Which heart rate zone should I train in?",
          answer: "It depends on your fitness goals. For fat burning and endurance, train in the light to moderate zones (60-80%). For improving cardiovascular fitness and performance, include some training in the hard zone (80-90%). Recovery workouts should stay in the very light zone (50-60%). A good training program typically includes work across multiple zones."
        }
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="mt-1"
                min={1}
                max={120}
              />
            </div>
            
            <div>
              <Label htmlFor="restingHR">Resting Heart Rate (bpm)</Label>
              <Input
                id="restingHR"
                type="number"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(parseInt(e.target.value) || 0)}
                className="mt-1"
                min={30}
                max={200}
              />
            </div>
            
            <div>
              <Label htmlFor="method">Calculation Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karvonen">Karvonen (Heart Rate Reserve)</SelectItem>
                  <SelectItem value="percentage">Percentage of Max HR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                {method === "karvonen" 
                  ? "Takes resting heart rate into account for more personalized zones"
                  : "Simple percentage-based calculation of maximum heart rate"}
              </p>
            </div>
            
            <Button onClick={handleCalculate} className="w-full">Calculate Heart Rate Zones</Button>
          </div>
          
          <div>
            {results ? (
              <div className="space-y-4">
                <ResultDisplay
                  label="Maximum Heart Rate"
                  value={`${results.maxHR} bpm`}
                  description="Estimated maximum heart rate"
                  icon={<Heart className="h-5 w-5 text-primary" />}
                  isHighlighted
                />
                
                <div className="space-y-2 mt-4">
                  <h3 className="font-medium">Target Heart Rate Zones</h3>
                  
                  <div className="bg-muted/30 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5 font-medium">Zone</div>
                    <div className="col-span-7 font-medium">Heart Rate (bpm)</div>
                  </div>
                  
                  <div className="bg-muted/10 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5">Very Light</div>
                    <div className="col-span-7">{results.zones.veryLight.min} - {results.zones.veryLight.max}</div>
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5">Light</div>
                    <div className="col-span-7">{results.zones.light.min} - {results.zones.light.max}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5">Moderate</div>
                    <div className="col-span-7">{results.zones.moderate.min} - {results.zones.moderate.max}</div>
                  </div>
                  
                  <div className="bg-muted/40 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5">Hard</div>
                    <div className="col-span-7">{results.zones.hard.min} - {results.zones.hard.max}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg grid grid-cols-12 gap-2">
                    <div className="col-span-5">Maximum</div>
                    <div className="col-span-7">{results.zones.maximum.min} - {results.zones.maximum.max}</div>
                  </div>
                </div>
                
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Training Tips</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>Very Light:</strong> Recovery, warmup/cooldown</li>
                      <li><strong>Light:</strong> Endurance, fat burning</li>
                      <li><strong>Moderate:</strong> Aerobic conditioning</li>
                      <li><strong>Hard:</strong> Improve anaerobic threshold</li>
                      <li><strong>Maximum:</strong> Performance, VO2 max (short periods only)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <div className="text-center">
                  <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">Heart Rate Zones</h3>
                  <p className="text-muted-foreground">
                    Enter your details and click calculate to see your target heart rate zones.
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

export default HeartRateCalculator;
