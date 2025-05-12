
import React, { useState } from 'react';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Calculator, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

const LightbulbSavingsCalculator: React.FC = () => {
  // Bulb types with their wattages and lifespans
  const bulbTypes = {
    incandescent: { name: "Incandescent", watts: 60, lifespan: 1000, cost: 1 },
    cfl: { name: "CFL", watts: 13, lifespan: 8000, cost: 3 },
    led: { name: "LED", watts: 9, lifespan: 25000, cost: 5 }
  };
  
  // Inputs
  const [currentBulbType, setCurrentBulbType] = useState<keyof typeof bulbTypes>("incandescent");
  const [newBulbType, setNewBulbType] = useState<keyof typeof bulbTypes>("led");
  const [bulbCount, setBulbCount] = useState<number>(10);
  const [hoursPerDay, setHoursPerDay] = useState<number>(5);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  
  // Results
  const [results, setResults] = useState<{
    annualSavings: number;
    energySavings: number;
    bulbLifespan: number;
    paybackPeriod: number;
    totalSavings: number;
  } | null>(null);
  
  // Calculate savings
  const calculateSavings = () => {
    try {
      if (
        isNaN(bulbCount) || isNaN(hoursPerDay) || isNaN(electricityRate) ||
        bulbCount <= 0 || hoursPerDay <= 0 || electricityRate <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const currentBulb = bulbTypes[currentBulbType];
      const newBulb = bulbTypes[newBulbType];
      
      // Calculate energy usage in kWh per year
      const hoursPerYear = hoursPerDay * 365;
      const currentEnergyUsage = (currentBulb.watts * bulbCount * hoursPerYear) / 1000;
      const newEnergyUsage = (newBulb.watts * bulbCount * hoursPerYear) / 1000;
      
      // Calculate energy savings in kWh per year
      const energySavings = currentEnergyUsage - newEnergyUsage;
      
      // Calculate annual cost savings
      const annualSavings = energySavings * electricityRate;
      
      // Calculate bulb lifespan in years
      const bulbLifespan = newBulb.lifespan / (hoursPerDay * 365);
      
      // Calculate payback period (months)
      const initialInvestment = bulbCount * (newBulb.cost - currentBulb.cost);
      const paybackPeriod = (initialInvestment / annualSavings) * 12;
      
      // Calculate total savings over lifespan of new bulbs
      const totalSavings = (annualSavings * bulbLifespan) - initialInvestment;
      
      setResults({
        annualSavings,
        energySavings,
        bulbLifespan,
        paybackPeriod,
        totalSavings
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
          <h3 className="flex items-center text-blue-700 font-medium mb-2">
            <Lightbulb className="h-4 w-4 mr-2" />
            Light Bulb Savings Calculator
          </h3>
          <p className="text-sm text-slate-600">
            Calculate how much you can save by upgrading to energy-efficient light bulbs.
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="current-bulb-type" className="block text-sm font-medium">
            Current Bulb Type
          </label>
          <select
            id="current-bulb-type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={currentBulbType}
            onChange={(e) => setCurrentBulbType(e.target.value as keyof typeof bulbTypes)}
          >
            <option value="incandescent">Incandescent (60W)</option>
            <option value="cfl">CFL (13W)</option>
            <option value="led">LED (9W)</option>
          </select>
          <p className="text-xs text-muted-foreground">Select your current light bulb type</p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="new-bulb-type" className="block text-sm font-medium">
            New Bulb Type
          </label>
          <select
            id="new-bulb-type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={newBulbType}
            onChange={(e) => setNewBulbType(e.target.value as keyof typeof bulbTypes)}
          >
            <option value="incandescent">Incandescent (60W)</option>
            <option value="cfl">CFL (13W)</option>
            <option value="led">LED (9W)</option>
          </select>
          <p className="text-xs text-muted-foreground">Select the light bulb type you want to switch to</p>
        </div>
        
        <CalculatorInput
          id="bulb-count"
          label="Number of Bulbs"
          type="number"
          value={bulbCount}
          onChange={(value) => setBulbCount(parseFloat(value) || 0)}
          min={1}
          step={1}
          helperText="Enter how many light bulbs you want to replace"
        />
        
        <CalculatorInput
          id="hours-per-day"
          label="Hours of Use Per Day"
          type="number"
          value={hoursPerDay}
          onChange={(value) => setHoursPerDay(parseFloat(value) || 0)}
          min={0.5}
          max={24}
          step={0.5}
          suffix=" hours"
          helperText="Average daily use of these lights"
        />
        
        <CalculatorInput
          id="electricity-rate"
          label="Electricity Rate"
          type="number"
          value={electricityRate}
          onChange={(value) => setElectricityRate(parseFloat(value) || 0)}
          min={0.01}
          step={0.01}
          prefix="$"
          suffix=" / kWh"
          helperText="Your electricity cost per kilowatt-hour"
        />
        
        <Button 
          onClick={calculateSavings}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 shadow-md transition-all duration-300"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Savings
        </Button>
      </div>
      
      <div>
        {results ? (
          <Card className="animate-fade-in h-full border-blue-100 shadow-md bg-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium mb-4 border-b pb-3">Light Bulb Savings Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label="Annual Cost Savings"
                  value={`$${results.annualSavings.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5 text-green-500" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="Energy Savings"
                  value={`${results.energySavings.toFixed(0)} kWh/year`}
                  icon={<Lightbulb className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="New Bulb Lifespan"
                  value={`${results.bulbLifespan.toFixed(1)} years`}
                  icon={<Lightbulb className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Payback Period"
                  value={`${results.paybackPeriod.toFixed(1)} months`}
                  icon={<Calculator className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Total Lifetime Savings"
                  value={`$${results.totalSavings.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5 text-green-600" />}
                />
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>By replacing {bulbCount} {bulbTypes[currentBulbType].name} bulbs with {bulbTypes[newBulbType].name} bulbs:</p>
                <p className="mt-2">You'll save <strong>${results.annualSavings.toFixed(2)}</strong> per year on electricity costs</p>
                <p className="mt-1">Your investment will pay for itself in <strong>{results.paybackPeriod.toFixed(1)} months</strong></p>
                <p className="mt-1">Over the lifetime of the bulbs, you'll save approximately <strong>${results.totalSavings.toFixed(2)}</strong></p>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700">
                  <p className="font-medium">Environmental Impact:</p>
                  <p>By saving {results.energySavings.toFixed(0)} kWh per year, you'll reduce your carbon footprint by approximately {(results.energySavings * 0.7).toFixed(0)} kg of CO₂ annually.</p>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Comparison Summary:</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <div></div>
                    <div className="font-medium">{bulbTypes[currentBulbType].name}</div>
                    <div className="font-medium">{bulbTypes[newBulbType].name}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>Wattage:</div>
                    <div>{bulbTypes[currentBulbType].watts}W</div>
                    <div>{bulbTypes[newBulbType].watts}W</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>Lifespan:</div>
                    <div>{bulbTypes[currentBulbType].lifespan} hours</div>
                    <div>{bulbTypes[newBulbType].lifespan} hours</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>Bulb Cost:</div>
                    <div>${bulbTypes[currentBulbType].cost.toFixed(2)}</div>
                    <div>${bulbTypes[newBulbType].cost.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50">
            <div className="text-center">
              <Lightbulb className="h-12 w-12 mx-auto text-blue-300 mb-3" />
              <h3 className="text-lg font-medium text-blue-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-blue-600/70 max-w-xs mx-auto">
                Enter your light bulb details and click calculate to see potential savings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightbulbSavingsCalculator;
