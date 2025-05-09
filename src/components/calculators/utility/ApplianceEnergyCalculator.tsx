
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ResultDisplay from '../ResultDisplay';
import { Zap, Calculator, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hoursPerDay: number;
  daysPerWeek: number;
}

const ApplianceEnergyCalculator: React.FC = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'Refrigerator', wattage: 150, hoursPerDay: 24, daysPerWeek: 7 },
    { id: '2', name: 'TV', wattage: 100, hoursPerDay: 4, daysPerWeek: 7 },
  ]);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);
  
  const [results, setResults] = useState<{
    dailyConsumption: number;
    monthlyConsumption: number;
    monthlyCost: number;
    yearlyCost: number;
    applianceBreakdown: { name: string; monthlyCost: number; percentage: number }[];
  } | null>(null);
  
  const addAppliance = () => {
    const newId = String(Date.now());
    setAppliances([...appliances, { 
      id: newId,
      name: 'New Appliance', 
      wattage: 100, 
      hoursPerDay: 2, 
      daysPerWeek: 5 
    }]);
  };
  
  const updateAppliance = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(appliance => 
      appliance.id === id ? { ...appliance, [field]: value } : appliance
    ));
  };
  
  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };
  
  const calculateEnergy = () => {
    try {
      if (appliances.length === 0) {
        toast.error('Please add at least one appliance');
        return;
      }
      
      if (electricityRate <= 0) {
        toast.error('Please enter a valid electricity rate');
        return;
      }
      
      let dailyTotal = 0;
      const applianceDetails = [];
      
      for (const appliance of appliances) {
        if (!appliance.name || appliance.wattage <= 0 || appliance.hoursPerDay <= 0 || appliance.daysPerWeek <= 0) {
          toast.error(`Please enter valid data for ${appliance.name || 'all appliances'}`);
          return;
        }
        
        const dailyKwh = (appliance.wattage * appliance.hoursPerDay) / 1000;
        const weeklyKwh = dailyKwh * appliance.daysPerWeek;
        const monthlyKwh = weeklyKwh * 4.33; // Average weeks per month
        const monthlyCost = monthlyKwh * electricityRate;
        
        dailyTotal += (dailyKwh * appliance.daysPerWeek) / 7; // Weighted daily average
        applianceDetails.push({
          name: appliance.name,
          monthlyCost,
          monthlyKwh
        });
      }
      
      const monthlyConsumption = dailyTotal * 30.44; // Average days per month
      const monthlyCost = monthlyConsumption * electricityRate;
      const totalMonthlyEnergy = applianceDetails.reduce((sum, app) => sum + app.monthlyKwh, 0);
      
      // Calculate percentage for each appliance
      const applianceBreakdown = applianceDetails.map(app => ({
        name: app.name,
        monthlyCost: app.monthlyCost,
        percentage: (app.monthlyKwh / totalMonthlyEnergy) * 100
      }));
      
      setResults({
        dailyConsumption: dailyTotal,
        monthlyConsumption,
        monthlyCost,
        yearlyCost: monthlyCost * 12,
        applianceBreakdown
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Appliance Energy Use Calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };
  
  const relatedCalculators = [
    { title: "Electricity Bill Calculator", path: "/calculators/utility/electricity-bill-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" },
    { title: "Light Bulb Energy Savings Calculator", path: "/calculators/utility/lightbulb-savings-calculator" }
  ];
  
  return (
    <CalculatorLayout
      title="Appliance Energy Use Calculator"
      description="Calculate the energy consumption and cost of various household appliances."
      intro="Our appliance energy use calculator helps you determine how much electricity your appliances use and their impact on your utility bill."
      formula={
        <div>
          <p>The appliance energy calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Daily Energy Consumption (kWh):</strong></p>
            <code>Daily kWh = (Wattage × Hours per Day) ÷ 1000</code>
            
            <p className="mt-3"><strong>Monthly Energy Consumption (kWh):</strong></p>
            <code>Monthly kWh = Daily kWh × Days per Week × 4.33</code>
            
            <p className="mt-3"><strong>Monthly Cost:</strong></p>
            <code>Monthly Cost = Monthly kWh × Electricity Rate</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "Which household appliances use the most electricity?",
          answer: "The biggest energy consumers in most homes are heating and cooling systems (HVAC), water heaters, refrigerators, washers/dryers, and electric ovens. Other significant users include dishwashers, lighting, computers, and entertainment systems. Energy-intensive but less frequently used appliances include pool pumps, hot tubs, and electric vehicle chargers."
        },
        {
          question: "How can I find the wattage of my appliances?",
          answer: "You can find the wattage information on the appliance's nameplate or label (usually on the back or bottom), in the owner's manual, or by searching the model number online. Many appliances show power in watts (W) or kilowatts (kW). If only amps and volts are listed, multiply them to get watts (Watts = Volts × Amps)."
        },
        {
          question: "How can I reduce my appliance energy costs?",
          answer: "To reduce energy costs: 1) Replace old appliances with ENERGY STAR certified models, 2) Unplug devices or use smart power strips to eliminate phantom power draw, 3) Run dishwashers and washing machines only when full, 4) Use cold water for laundry when possible, 5) Keep refrigerator coils clean and set to optimal temperatures, 6) Use programmable thermostats, and 7) Maintain all appliances regularly."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/appliance-energy-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <Card className="border border-muted">
          <CardContent className="pt-6">
            <div className="mb-6">
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
                helperText="Enter your cost per kilowatt-hour (typically $0.10-$0.20)"
              />
            </div>
            
            <h3 className="text-lg font-medium mb-2">Your Appliances</h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
              {appliances.map((appliance) => (
                <div key={appliance.id} className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <Input
                      value={appliance.name}
                      onChange={(e) => updateAppliance(appliance.id, 'name', e.target.value)}
                      className="max-w-[200px]"
                      placeholder="Appliance Name"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAppliance(appliance.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CalculatorInput
                      id={`wattage-${appliance.id}`}
                      label="Wattage"
                      type="number"
                      value={appliance.wattage}
                      onChange={(value) => updateAppliance(appliance.id, 'wattage', parseFloat(value) || 0)}
                      min={1}
                      step={1}
                      suffix=" W"
                      helperText=""
                    />
                    
                    <CalculatorInput
                      id={`hours-${appliance.id}`}
                      label="Hours per Day"
                      type="number"
                      value={appliance.hoursPerDay}
                      onChange={(value) => updateAppliance(appliance.id, 'hoursPerDay', parseFloat(value) || 0)}
                      min={0.1}
                      max={24}
                      step={0.5}
                      suffix=" hrs"
                      helperText=""
                    />
                    
                    <CalculatorInput
                      id={`days-${appliance.id}`}
                      label="Days per Week"
                      type="number"
                      value={appliance.daysPerWeek}
                      onChange={(value) => updateAppliance(appliance.id, 'daysPerWeek', parseFloat(value) || 0)}
                      min={1}
                      max={7}
                      step={1}
                      suffix=" days"
                      helperText=""
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    Daily: {((appliance.wattage * appliance.hoursPerDay) / 1000).toFixed(2)} kWh | 
                    Monthly: {((appliance.wattage * appliance.hoursPerDay * appliance.daysPerWeek * 4.33) / 1000).toFixed(2)} kWh
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={addAppliance}>
                <Plus className="h-4 w-4 mr-2" />
                Add Appliance
              </Button>
              
              <Button 
                onClick={calculateEnergy}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Energy Usage
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {results && (
          <Card className="animate-fade-in border border-muted">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Energy Usage Summary</h3>
              
              <div className="space-y-3">
                <ResultDisplay
                  label="Daily Energy Consumption"
                  value={`${results.dailyConsumption.toFixed(2)} kWh`}
                  icon={<Zap className="h-5 w-5" />}
                />
                
                <ResultDisplay
                  label="Monthly Energy Consumption"
                  value={`${results.monthlyConsumption.toFixed(2)} kWh`}
                  icon={<Zap className="h-5 w-5" />}
                />
                
                <ResultDisplay
                  label="Monthly Cost"
                  value={`$${results.monthlyCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5" />}
                  isHighlighted={true}
                />
                
                <ResultDisplay
                  label="Annual Cost"
                  value={`$${results.yearlyCost.toFixed(2)}`}
                  icon={<Calculator className="h-5 w-5" />}
                  isHighlighted={true}
                />
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Appliance Cost Breakdown</h4>
                <div className="space-y-2">
                  {results.applianceBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>${item.monthlyCost.toFixed(2)}/mo</span>
                        <span className="text-muted-foreground">{item.percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Based on an electricity rate of ${electricityRate}/kWh, your appliances cost approximately ${results.monthlyCost.toFixed(2)} per month.</p>
                <p className="mt-2">Consider upgrading high-usage appliances to energy-efficient models to reduce your electricity bill.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default ApplianceEnergyCalculator;
