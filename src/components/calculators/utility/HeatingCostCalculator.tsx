
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
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
  
  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Heating Cost Calculator",
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
    { title: "Electricity Bill Calculator", path: "/calculators/utility/electricity-bill-calculator" },
    { title: "Cooling Cost Calculator", path: "/calculators/utility/cooling-cost-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" }
  ];

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
    <CalculatorLayout
      title="Heating Cost Calculator"
      description="Estimate heating costs based on your home size and energy source."
      intro="Our heating cost calculator helps you estimate your home heating expenses based on your home size, heating system efficiency, and fuel type."
      formula={
        <div>
          <p>The heating cost calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Total BTU Per Month:</strong></p>
            <code>Total BTU = Home Size (sq ft) × BTU per sq ft per month</code>
            
            <p className="mt-3"><strong>Adjusted BTU (for efficiency):</strong></p>
            <code>Adjusted BTU = Total BTU ÷ (Efficiency ÷ 100)</code>
            
            <p className="mt-3"><strong>Monthly Fuel Usage:</strong></p>
            <code>Fuel Usage = Adjusted BTU ÷ BTU per Fuel Unit</code>
            
            <p className="mt-3"><strong>Monthly Cost:</strong></p>
            <code>Monthly Cost = Fuel Usage × Fuel Rate</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What heating system is most cost-effective?",
          answer: "The most cost-effective heating system depends on local fuel prices and climate. Generally, high-efficiency heat pumps are cost-effective in moderate climates, while natural gas furnaces are often more economical in colder regions. Electric resistance heating is typically the most expensive option, while geothermal heat pumps have high upfront costs but very low operating costs."
        },
        {
          question: "How can I reduce my heating costs?",
          answer: "To reduce heating costs: 1) Improve insulation in walls, attic, and floors, 2) Seal air leaks around windows, doors, and ducts, 3) Install a programmable or smart thermostat, 4) Lower your thermostat by a few degrees and wear warmer clothes, 5) Service your heating system annually, 6) Upgrade to a more efficient heating system, 7) Use solar gain by opening curtains during sunny days, and 8) Close off and don't heat unused rooms."
        },
        {
          question: "How does heating system efficiency affect my costs?",
          answer: "Heating system efficiency directly impacts your heating costs. For example, if your system is 80% efficient, 20% of the fuel's energy is wasted. Upgrading from an 80% to a 95% efficient system could reduce fuel consumption by about 16%. While high-efficiency systems cost more upfront, the fuel savings often provide a good return on investment, particularly in colder climates with longer heating seasons."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/heating-cost-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Heating Cost
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Heating Cost Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label={`Monthly Usage (${fuelType === 'natural_gas' ? 'therms' : fuelType === 'electric' ? 'kWh' : 'gallons'})`}
                    value={results.monthlyUsage.toFixed(2)}
                    icon={<Thermometer className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Monthly Cost"
                    value={`$${results.monthlyCost.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label={`Seasonal Cost (${heatingMonths} months)`}
                    value={`$${results.seasonalCost.toFixed(2)}`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Cost per Square Foot"
                    value={`$${results.costPerSquareFoot.toFixed(2)}/sq ft`}
                    icon={<Calculator className="h-5 w-5" />}
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
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HeatingCostCalculator;
