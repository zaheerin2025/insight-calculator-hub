
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { Zap, Calculator, AlertTriangle, Lightbulb, DollarSign, PieChart } from 'lucide-react';
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
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 mb-6 shadow-sm">
          <h3 className="flex items-center text-blue-700 font-medium mb-2">
            <Lightbulb className="h-4 w-4 mr-2" />
            Electricity Bill Calculator
          </h3>
          <p className="text-sm text-slate-600">
            Calculate your estimated monthly electricity bill based on your consumption and local rates.
          </p>
        </div>
      
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 shadow-md transition-all duration-300"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Electricity Bill
        </Button>
      </div>
      
      <div>
        {results ? (
          <Card className="animate-fade-in h-full border-blue-100 shadow-md bg-white">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <div className="flex items-center justify-between mb-6 border-b pb-3">
                <h3 className="text-lg font-medium">Electricity Bill Summary</h3>
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <ResultDisplay
                  label="Energy Charge"
                  value={`$${results.energyCharge.toFixed(2)}`}
                  icon={<DollarSign className="h-5 w-5 text-amber-500" />}
                />
                
                <ResultDisplay
                  label="Fixed Charges"
                  value={`$${results.fixedCharge.toFixed(2)}`}
                  icon={<DollarSign className="h-5 w-5 text-blue-500" />}
                />
                
                <ResultDisplay
                  label="Taxes"
                  value={`$${results.taxAmount.toFixed(2)}`}
                  icon={<DollarSign className="h-5 w-5 text-red-500" />}
                />
                
                <ResultDisplay
                  label="Total Monthly Bill"
                  value={`$${results.totalBill.toFixed(2)}`}
                  icon={<Zap className="h-5 w-5 text-blue-600" />}
                  isHighlighted={true}
                />
              </div>
              
              <div className="mt-6 text-sm text-slate-600 border-t pt-4">
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="font-medium text-blue-700 mb-1">Bill Breakdown</p>
                  <p>For {kwh} kWh of electricity usage at ${rate.toFixed(2)}/kWh</p>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Energy charge:</span>
                    <span className="font-medium">${results.energyCharge.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Fixed charges:</span>
                    <span className="font-medium">${results.fixedCharge.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Taxes ({taxes}%):</span>
                    <span className="font-medium">${results.taxAmount.toFixed(2)}</span>
                  </li>
                  <li className="flex items-center justify-between text-blue-700">
                    <span className="font-bold">Total monthly bill:</span>
                    <span className="font-bold">${results.totalBill.toFixed(2)}</span>
                  </li>
                </ul>
                
                {kwh > 800 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-md text-amber-700 flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Energy Saving Tip:</p>
                      <p>Your consumption is relatively high. Consider energy-efficient appliances or reducing usage during peak hours to lower your bill.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50">
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto text-blue-300 mb-3" />
              <h3 className="text-lg font-medium text-blue-700 mb-1">No Results Yet</h3>
              <p className="text-sm text-blue-600/70 max-w-xs mx-auto">
                Enter your electricity usage details and click the calculate button to see your bill breakdown.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricityBillCalculator;
