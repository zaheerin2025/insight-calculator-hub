
import React, { useState } from 'react';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Thermometer, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const HeatingCostCalculator: React.FC = () => {
  // Inputs
  const [homeSize, setHomeSize] = useState<number>(1500);
  const [efficiency, setEfficiency] = useState<number>(80);
  const [fuelType, setFuelType] = useState<string>("natural_gas");
  const [fuelRate, setFuelRate] = useState<number>(1.2);
  const [heatingMonths, setHeatingMonths] = useState<number>(5);
  
  // Results
  const [results, setResults] = useState<{
    monthlyUsage: number;
    monthlyCost: number;
    seasonalCost: number;
    costPerSquareFoot: number;
  } | null>(null);
  
  // Calculate heating costs
  const calculateHeatingCost = () => {
    try {
      if (
        isNaN(homeSize) || isNaN(efficiency) || isNaN(fuelRate) || isNaN(heatingMonths) ||
        homeSize <= 0 || efficiency <= 0 || efficiency > 100 || fuelRate <= 0 || heatingMonths <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Fuel type factors (BTUs per unit and cost units)
      const fuelFactors: Record<string, {btuPerUnit: number, label: string}> = {
        natural_gas: { btuPerUnit: 100000, label: 'therms' },  // BTU per therm
        electric: { btuPerUnit: 3413, label: 'kWh' },  // BTU per kWh
        propane: { btuPerUnit: 91500, label: 'gallons' }, // BTU per gallon
        oil: { btuPerUnit: 138500, label: 'gallons' }  // BTU per gallon
      };
      
      // Average BTU per square foot per month for heating
      const btuPerSqFtPerMonth = 10000;
      
      // Calculate total BTU needed per month
      const totalBtuPerMonth = homeSize * btuPerSqFtPerMonth;
      
      // Adjust for efficiency
      const adjustedBtuPerMonth = totalBtuPerMonth / (efficiency / 100);
      
      // Calculate fuel units needed
      const monthlyUsage = adjustedBtuPerMonth / fuelFactors[fuelType].btuPerUnit;
      
      // Calculate costs
      const monthlyCost = monthlyUsage * fuelRate;
      const seasonalCost = monthlyCost * heatingMonths;
      const costPerSquareFoot = seasonalCost / homeSize;
      
      setResults({
        monthlyUsage,
        monthlyCost,
        seasonalCost,
        costPerSquareFoot
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  // Fuel type options
  const fuelTypeOptions = [
    { value: 'natural_gas', label: 'Natural Gas (per therm)', rate: 1.2 },
    { value: 'electric', label: 'Electricity (per kWh)', rate: 0.15 },
    { value: 'propane', label: 'Propane (per gallon)', rate: 2.5 },
    { value: 'oil', label: 'Heating Oil (per gallon)', rate: 3.0 }
  ];

  // Update fuel rate when fuel type changes
  const handleFuelTypeChange = (value: string) => {
    setFuelType(value);
    const selectedFuel = fuelTypeOptions.find(option => option.value === value);
    if (selectedFuel) {
      setFuelRate(selectedFuel.rate);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
          <h3 className="flex items-center text-blue-700 font-medium mb-2">
            <Thermometer className="h-4 w-4 mr-2" />
            Heating Cost Calculator
          </h3>
          <p className="text-sm text-slate-600">
            Estimate your home heating costs based on your home size, energy source, and fuel rates.
          </p>
        </div>

        <CalculatorInput
          id="home-size"
          label="Home Size"
          type="number"
          value={homeSize}
          onChange={(value) => setHomeSize(parseFloat(value) || 0)}
          min={100}
          step={100}
          suffix=" sq ft"
          helperText="Enter your home's heated area in square feet"
        />
        
        <div className="space-y-2">
          <label htmlFor="fuel-type" className="block text-sm font-medium">
            Fuel Type
          </label>
          <select
            id="fuel-type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fuelType}
            onChange={(e) => handleFuelTypeChange(e.target.value)}
          >
            {fuelTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">Select your heating fuel type</p>
        </div>
        
        <CalculatorInput
          id="fuel-rate"
          label={`Fuel Rate (${fuelType === 'natural_gas' ? 'per therm' : fuelType === 'electric' ? 'per kWh' : 'per gallon'})`}
          type="number"
          value={fuelRate}
          onChange={(value) => setFuelRate(parseFloat(value) || 0)}
          min={0.01}
          step={0.01}
          prefix="$"
          helperText="Enter the cost per unit of your heating fuel"
        />
        
        <CalculatorInput
          id="efficiency"
          label="System Efficiency"
          type="number"
          value={efficiency}
          onChange={(value) => setEfficiency(parseFloat(value) || 0)}
          min={50}
          max={100}
          step={1}
          suffix="%"
          helperText="Enter your heating system's efficiency (typically 80-95% for newer systems)"
        />
        
        <CalculatorInput
          id="heating-months"
          label="Heating Season Length"
          type="number"
          value={heatingMonths}
          onChange={(value) => setHeatingMonths(parseFloat(value) || 0)}
          min={1}
          max={12}
          step={1}
          suffix=" months"
          helperText="Enter the number of months you use heating in a year"
        />
        
        <Button 
          onClick={calculateHeatingCost}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 shadow-md transition-all duration-300"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Heating Cost
        </Button>
      </div>
      
      <div>
        {results && (
          <Card className="animate-fade-in h-full border-blue-100 shadow-md bg-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium mb-4 border-b pb-3">Heating Cost Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label={`Monthly Usage (${fuelType === 'natural_gas' ? 'therms' : fuelType === 'electric' ? 'kWh' : 'gallons'})`}
                  value={results.monthlyUsage.toFixed(2)}
                  icon={<Thermometer className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Monthly Cost"
                  value={`$${results.monthlyCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label={`Seasonal Cost (${heatingMonths} months)`}
                  value={`$${results.seasonalCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5 text-blue-600" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="Cost per Square Foot"
                  value={`$${results.costPerSquareFoot.toFixed(2)}/sq ft`}
                  icon={<Calculator className="h-5 w-5 text-blue-500" />}
                />
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                <p>For a {homeSize} sq ft home with {efficiency}% heating system efficiency:</p>
                <p className="mt-2">Your estimated monthly heating cost is <strong>${results.monthlyCost.toFixed(2)}</strong></p>
                <p className="mt-1">Your total seasonal heating cost is approximately <strong>${results.seasonalCost.toFixed(2)}</strong></p>
                <p className="mt-2">This equals <strong>${results.costPerSquareFoot.toFixed(2)} per square foot</strong> for the heating season</p>
                
                {efficiency < 85 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                    <p className="font-medium">Energy Saving Tip:</p>
                    <p>Consider upgrading to a higher efficiency heating system. Increasing efficiency from {efficiency}% to 95% could reduce your heating costs by approximately ${(results.seasonalCost - (results.seasonalCost * efficiency / 95)).toFixed(2)} per season.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {!results && (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50">
            <div className="text-center">
              <Thermometer className="h-12 w-12 mx-auto text-blue-300 mb-3" />
              <h3 className="text-lg font-medium text-blue-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-blue-600/70 max-w-xs mx-auto">
                Enter your heating details and click calculate to see your estimated costs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatingCostCalculator;
