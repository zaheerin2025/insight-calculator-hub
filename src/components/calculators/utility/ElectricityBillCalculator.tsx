import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Zap, Calculator } from 'lucide-react';
import { toast } from 'sonner';

const ElectricityBillCalculator: React.FC = () => {
  // Inputs
  const [kwh, setKwh] = useState<number>(500);
  const [rate, setRate] = useState<number>(0.12);
  const [fixedCharges, setFixedCharges] = useState<number>(15);
  const [taxes, setTaxes] = useState<number>(8);
  
  // Results
  const [results, setResults] = useState<{
    energyCharge: number;
    fixedCharge: number;
    taxAmount: number;
    totalBill: number;
  } | null>(null);
  
  // Calculate electricity bill
  const calculateElectricityBill = () => {
    try {
      if (
        isNaN(kwh) || isNaN(rate) || isNaN(fixedCharges) || isNaN(taxes) ||
        kwh < 0 || rate < 0 || fixedCharges < 0 || taxes < 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      // Calculate energy charge
      const energyCharge = kwh * rate;
      
      // Calculate tax amount
      const taxAmount = ((energyCharge + fixedCharges) * taxes) / 100;
      
      // Calculate total bill
      const totalBill = energyCharge + fixedCharges + taxAmount;
      
      setResults({
        energyCharge,
        fixedCharge: fixedCharges,
        taxAmount,
        totalBill
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
    "name": "Electricity Bill Calculator",
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
    { title: "Appliance Energy Use Calculator", path: "/calculators/utility/appliance-energy-calculator" },
    { title: "Solar Panel Savings Calculator", path: "/calculators/utility/solar-panel-calculator" },
    { title: "Light Bulb Energy Savings Calculator", path: "/calculators/utility/lightbulb-savings-calculator" }
  ];

  return (
    <CalculatorLayout
      title="Electricity Bill Calculator"
      description="Calculate your monthly electricity bill based on energy consumption, rates, and additional charges."
      intro="Our electricity bill calculator helps you estimate your monthly electricity costs based on your energy usage, local electricity rates, and any additional charges or taxes."
      formula={
        <div>
          <p>The electricity bill calculation uses the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Energy Charge:</strong></p>
            <code>Energy Charge = Energy Consumption (kWh) × Rate per kWh</code>
            
            <p className="mt-3"><strong>Tax Amount:</strong></p>
            <code>Tax Amount = (Energy Charge + Fixed Charges) × (Tax Percentage ÷ 100)</code>
            
            <p className="mt-3"><strong>Total Bill:</strong></p>
            <code>Total Bill = Energy Charge + Fixed Charges + Tax Amount</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How do I find my electricity rate per kWh?",
          answer: "Your electricity rate can be found on your most recent electricity bill or on your utility company's website. Rates typically range from $0.10 to $0.20 per kWh in the US, but can vary significantly by location and provider."
        },
        {
          question: "What are fixed charges on my electricity bill?",
          answer: "Fixed charges (also called customer charges or service fees) are the set amounts you pay regardless of how much electricity you use. These cover the costs of maintaining the grid, reading meters, and processing bills. These charges typically range from $10 to $30 per month."
        },
        {
          question: "How can I reduce my electricity bill?",
          answer: "To reduce your electricity bill, consider: using energy-efficient appliances, installing LED lighting, adjusting your thermostat settings, unplugging devices when not in use, using smart power strips, improving insulation, and utilizing natural lighting. You might also look into time-of-use plans if your utility offers them."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/utility/electricity-bill-calculator"
      relatedCalculators={relatedCalculators}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="kwh"
            label="Energy Consumption"
            type="number"
            value={kwh}
            onChange={(value) => setKwh(parseFloat(value) || 0)}
            min={0}
            step={10}
            suffix=" kWh"
            helperText="Enter your monthly electricity consumption in kilowatt-hours (kWh)"
          />
          
          <CalculatorInput
            id="rate"
            label="Rate per kWh"
            type="number"
            value={rate}
            onChange={(value) => setRate(parseFloat(value) || 0)}
            min={0.01}
            step={0.01}
            prefix="$"
            helperText="Enter the cost per kilowatt-hour (typically $0.10-$0.20)"
          />
          
          <CalculatorInput
            id="fixed-charges"
            label="Fixed Charges"
            type="number"
            value={fixedCharges}
            onChange={(value) => setFixedCharges(parseFloat(value) || 0)}
            min={0}
            step={1}
            prefix="$"
            helperText="Enter any fixed monthly charges (e.g., service fee, distribution charge)"
          />
          
          <CalculatorInput
            id="taxes"
            label="Tax Percentage"
            type="number"
            value={taxes}
            onChange={(value) => setTaxes(parseFloat(value) || 0)}
            min={0}
            max={100}
            step={0.1}
            suffix="%"
            helperText="Enter the applicable tax percentage"
          />
          
          <Button 
            onClick={calculateElectricityBill}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Electricity Bill
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Electricity Bill Summary</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Energy Charge"
                    value={`$${results.energyCharge.toFixed(2)}`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Fixed Charges"
                    value={`$${results.fixedCharge.toFixed(2)}`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Taxes"
                    value={`$${results.taxAmount.toFixed(2)}`}
                    icon={<Zap className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Total Monthly Bill"
                    value={`$${results.totalBill.toFixed(2)}`}
                    icon={<Zap className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>For {kwh} kWh of electricity usage at ${rate.toFixed(2)}/kWh:</p>
                  <p className="mt-2">Your energy charge is <strong>${results.energyCharge.toFixed(2)}</strong></p>
                  <p className="mt-1">Fixed charges add <strong>${results.fixedCharge.toFixed(2)}</strong></p>
                  <p className="mt-1">Taxes ({taxes}%) add <strong>${results.taxAmount.toFixed(2)}</strong></p>
                  <p className="mt-2">Your total monthly electricity bill is <strong>${results.totalBill.toFixed(2)}</strong></p>
                  
                  {kwh > 800 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md text-amber-700">
                      <p className="font-medium">Energy Saving Tip:</p>
                      <p>Your consumption is relatively high. Consider energy-efficient appliances or reducing usage during peak hours to lower your bill.</p>
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

export default ElectricityBillCalculator;
