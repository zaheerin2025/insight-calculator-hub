
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Car, Calculator, Zap } from 'lucide-react';
import { toast } from 'sonner';

const EVRangeCalculator: React.FC = () => {
  // Inputs
  const [batteryCapacity, setBatteryCapacity] = useState<number>(75);
  const [efficiency, setEfficiency] = useState<number>(3.5);
  const [temperature, setTemperature] = useState<number>(70);
  const [acUsage, setAcUsage] = useState<boolean>(false);
  const [heaterUsage, setHeaterUsage] = useState<boolean>(false);
  const [highwayDriving, setHighwayDriving] = useState<number>(50);
  const [chargingEfficiency, setChargingEfficiency] = useState<number>(90);
  
  // Results
  const [results, setResults] = useState<{
    idealRange: number;
    adjustedRange: number;
    chargingTime: number;
    cost100Miles: number;
  } | null>(null);
  
  // Calculate EV range
  const calculateRange = () => {
    try {
      if (
        isNaN(batteryCapacity) || isNaN(efficiency) || isNaN(temperature) ||
        isNaN(highwayDriving) || isNaN(chargingEfficiency) ||
        batteryCapacity <= 0 || efficiency <= 0 || 
        highwayDriving < 0 || highwayDriving > 100 || chargingEfficiency <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate ideal range
      const idealRange = batteryCapacity / efficiency * 100; // miles
      
      // Temperature factor (significant impact on battery performance)
      let tempFactor = 1.0;
      if (temperature < 32) {
        tempFactor = 0.7; // cold weather reduces range by ~30%
      } else if (temperature < 45) {
        tempFactor = 0.8;
      } else if (temperature > 90) {
        tempFactor = 0.9; // hot weather impacts range by ~10%
      }
      
      // Climate control factor
      let climateFactor = 1.0;
      if (acUsage) {
        climateFactor -= 0.1; // AC reduces range by ~10%
      }
      if (heaterUsage) {
        climateFactor -= 0.15; // Heater reduces range by ~15%
      }
      
      // Highway driving factor (highway driving is typically less efficient)
      const highwayFactor = 1 - (highwayDriving / 100) * 0.2; // Up to 20% reduction for 100% highway
      
      // Calculate adjusted range
      const adjustedRange = idealRange * tempFactor * climateFactor * highwayFactor;
      
      // Calculate approximate charging time (hours) on a 7.7kW home charger
      const chargingTime = (batteryCapacity * (100 / chargingEfficiency)) / 7.7;
      
      // Calculate cost per 100 miles (assuming $0.15/kWh)
      const cost100Miles = (efficiency * 100) * 0.15;
      
      setResults({
        idealRange,
        adjustedRange,
        chargingTime,
        cost100Miles
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
    "name": "Electric Vehicle Range Calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };
  
  // Related calculators
  const relatedCalculators = [
    { title: "Gas Mileage Calculator", path: "/calculators/utility/gas-mileage-calculator" },
    { title: "Carbon Footprint Calculator", path: "/calculators/utility/carbon-footprint-calculator" },
    { title: "Electricity Bill Calculator", path: "/calculators/utility/electricity-bill-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Electric Vehicle Range Calculator"
      description="Estimate how far your electric vehicle can travel on a single charge."
      intro="Our EV range calculator helps you estimate your electric vehicle's real-world driving range based on battery capacity, efficiency, and driving conditions."
      formula={
        <div>
          <p>The EV range calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Ideal Range:</strong></p>
            <code>Ideal Range = (Battery Capacity ÷ Efficiency) × 100</code>
            
            <p className="mt-3"><strong>Adjusted Range:</strong></p>
            <code>Adjusted Range = Ideal Range × Temperature Factor × Climate Control Factor × Highway Factor</code>
            
            <p className="mt-3"><strong>Charging Time (7.7kW charger):</strong></p>
            <code>Charging Time = (Battery Capacity × (100 ÷ Charging Efficiency)) ÷ 7.7</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What affects electric vehicle range the most?",
          answer: "The biggest factors affecting EV range are: 1) Outside temperature (cold weather can reduce range by 20-40%), 2) Driving speed (high-speed highway driving uses more energy), 3) Climate control usage (heating and AC), 4) Driving style (aggressive acceleration/braking), 5) Terrain (hilly routes consume more energy), 6) Battery age (capacity degrades over time), 7) Payload weight, and 8) Tire pressure and type. Preconditioning your vehicle while it's still plugged in can help mitigate some of these effects."
        },
        {
          question: "How can I maximize my electric vehicle's range?",
          answer: "To maximize your EV's range: 1) Precondition the vehicle while still plugged in, 2) Drive at moderate speeds (efficiency typically peaks around 15-45 mph), 3) Use eco mode settings, 4) Utilize regenerative braking, 5) Maintain proper tire pressure, 6) Remove unnecessary weight, 7) Use seat heaters instead of cabin heat when possible, 8) Plan routes to avoid steep hills when possible, and 9) Take advantage of pre-heating or pre-cooling your car while still plugged in."
        },
        {
          question: "Why is my actual range different from the advertised range?",
          answer: "Advertised EV ranges are typically based on standardized tests like EPA or WLTP cycles, which may not reflect real-world driving conditions. Factors like cold weather, high speeds, climate control usage, and aggressive driving can significantly reduce range. Some manufacturers provide more conservative range estimates, while others optimize for test conditions. Most EV drivers find actual range is 10-30% less than advertised, especially in cold weather or primarily highway driving."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/ev-range-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="battery-capacity"
            label="Battery Capacity"
            type="number"
            value={batteryCapacity}
            onChange={(value) => setBatteryCapacity(parseFloat(value) || 0)}
            min={10}
            step={1}
            suffix=" kWh"
            helperText="Enter your EV's battery capacity (usable kWh)"
          />
          
          <CalculatorInput
            id="efficiency"
            label="Energy Efficiency"
            type="number"
            value={efficiency}
            onChange={(value) => setEfficiency(parseFloat(value) || 0)}
            min={2}
            max={5}
            step={0.1}
            suffix=" mi/kWh"
            helperText="Average miles per kWh (3-4 for most EVs)"
          />
          
          <CalculatorInput
            id="temperature"
            label="Outside Temperature"
            type="number"
            value={temperature}
            onChange={(value) => setTemperature(parseFloat(value) || 0)}
            min={-10}
            max={110}
            step={1}
            suffix="°F"
            helperText="Current or expected temperature"
          />
          
          <CalculatorInput
            id="highway-driving"
            label="Highway Driving"
            type="number"
            value={highwayDriving}
            onChange={(value) => setHighwayDriving(parseFloat(value) || 0)}
            min={0}
            max={100}
            step={5}
            suffix="%"
            helperText="Percentage of your trip on highways"
          />
          
          <CalculatorInput
            id="charging-efficiency"
            label="Charging Efficiency"
            type="number"
            value={chargingEfficiency}
            onChange={(value) => setChargingEfficiency(parseFloat(value) || 0)}
            min={50}
            max={100}
            step={1}
            suffix="%"
            helperText="Energy transfer efficiency (typically 85-90%)"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                id="ac-usage"
                type="checkbox"
                checked={acUsage}
                onChange={(e) => setAcUsage(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label htmlFor="ac-usage" className="text-sm font-medium">
                AC in Use
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="heater-usage"
                type="checkbox"
                checked={heaterUsage}
                onChange={(e) => setHeaterUsage(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label htmlFor="heater-usage" className="text-sm font-medium">
                Heater in Use
              </label>
            </div>
          </div>
          
          <Button 
            onClick={calculateRange}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate EV Range
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">EV Range Estimate</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Ideal Range (EPA-like)"
                    value={`${results.idealRange.toFixed(0)} miles`}
                    icon={<Car className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Real-World Range"
                    value={`${results.adjustedRange.toFixed(0)} miles`}
                    icon={<Car className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Estimated Charging Time (7.7kW)"
                    value={`${results.chargingTime.toFixed(1)} hours`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Cost per 100 miles"
                    value={`$${results.cost100Miles.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>With a {batteryCapacity} kWh battery and {efficiency} mi/kWh efficiency:</p>
                  <p className="mt-2">Your ideal range is <strong>{results.idealRange.toFixed(0)} miles</strong>, but real-world conditions reduce this to approximately <strong>{results.adjustedRange.toFixed(0)} miles</strong>.</p>
                  
                  <div className="mt-4">
                    <p className="font-medium">Impact of various factors on your range:</p>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {temperature < 32 && (
                        <li>Cold weather ({temperature}°F) reduces range by ~30%</li>
                      )}
                      {temperature > 90 && (
                        <li>Hot weather ({temperature}°F) reduces range by ~10%</li>
                      )}
                      {acUsage && (
                        <li>AC usage reduces range by ~10%</li>
                      )}
                      {heaterUsage && (
                        <li>Heater usage reduces range by ~15%</li>
                      )}
                      {highwayDriving > 20 && (
                        <li>Highway driving ({highwayDriving}%) reduces range by ~{(highwayDriving * 0.2).toFixed(0)}%</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700">
                    <p className="font-medium">Cost Comparison:</p>
                    <p>At ${results.cost100Miles.toFixed(2)} per 100 miles, your EV is approximately {((7 / results.cost100Miles) * 100).toFixed(0)}% cheaper to operate than a gasoline car getting 25 MPG at $3.50/gallon ($14.00 per 100 miles).</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default EVRangeCalculator;
