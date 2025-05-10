
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Zap, Calculator } from 'lucide-react';
import { toast } from 'sonner';
import CalculatorInput from '@/components/ui/calculator-input';

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

  return (
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
  );
};

export default ElectricityBillCalculator;
