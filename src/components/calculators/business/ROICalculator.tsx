
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ROICalculator: React.FC = () => {
  // Tab 1: Basic ROI
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [basicResults, setBasicResults] = useState<{
    roi: number;
    gain: number;
  } | null>(null);

  // Tab 2: Annualized ROI
  const [annualInvestment, setAnnualInvestment] = useState<number>(10000);
  const [annualFinalValue, setAnnualFinalValue] = useState<number>(15000);
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [annualizedResults, setAnnualizedResults] = useState<{
    totalROI: number;
    annualizedROI: number;
    totalGain: number;
  } | null>(null);

  // Calculate basic ROI
  const calculateBasicROI = () => {
    try {
      if (isNaN(initialInvestment) || isNaN(finalValue) || initialInvestment <= 0) {
        toast.error('Please enter valid positive numbers (investment must be greater than zero)');
        return;
      }
      
      const gain = finalValue - initialInvestment;
      const roi = (gain / initialInvestment) * 100;
      
      setBasicResults({
        roi,
        gain
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate annualized ROI
  const calculateAnnualizedROI = () => {
    try {
      if (isNaN(annualInvestment) || isNaN(annualFinalValue) || isNaN(timePeriod) || 
          annualInvestment <= 0 || timePeriod <= 0) {
        toast.error('Please enter valid positive numbers (investment and time period must be greater than zero)');
        return;
      }
      
      const totalGain = annualFinalValue - annualInvestment;
      const totalROI = (totalGain / annualInvestment) * 100;
      // Annualized ROI formula: (1 + Total ROI)^(1/n) - 1
      const annualizedROI = (Math.pow((1 + totalROI / 100), 1 / timePeriod) - 1) * 100;
      
      setAnnualizedResults({
        totalROI,
        annualizedROI,
        totalGain
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
    "name": "ROI Calculator",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate return on investment (ROI) for your business decisions, marketing campaigns, or financial investments with our easy-to-use ROI calculator."
      intro="Our ROI calculator helps you measure the profitability and efficiency of your investments. Calculate both basic ROI and annualized ROI to better understand the performance of your financial decisions."
      formula={
        <div>
          <p>The ROI calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Basic ROI:</strong></p>
            <code>ROI = ((Final Value - Initial Investment) / Initial Investment) × 100</code>
            
            <p className="mt-3"><strong>Annualized ROI:</strong></p>
            <code>Annualized ROI = ((1 + (Total ROI / 100))^(1/n) - 1) × 100</code>
            <p className="text-xs mt-1">where n is the time period in years</p>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is a good ROI?",
          answer: "A good ROI depends on factors like industry benchmarks, risk levels, and opportunity costs. Generally, an ROI above 10% is considered good for many investments, while higher-risk ventures might require 20% or more to be attractive."
        },
        {
          question: "How is ROI different from profit?",
          answer: "Profit is the absolute gain from an investment (revenue minus costs), while ROI is a ratio that shows the efficiency of an investment by comparing the profit to the initial investment amount, expressed as a percentage."
        },
        {
          question: "Why use annualized ROI instead of simple ROI?",
          answer: "Annualized ROI allows you to compare investments with different time horizons on an equal basis. It provides the average annual return rate, making it easier to evaluate whether an investment meets your yearly performance goals."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/roi-calculator"
    >
      <Tabs defaultValue="basic-roi" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-roi">Basic ROI</TabsTrigger>
          <TabsTrigger value="annualized-roi">Annualized ROI</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Basic ROI */}
        <TabsContent value="basic-roi" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="initial-investment"
                label="Initial Investment"
                type="number"
                value={initialInvestment}
                onChange={(value) => setInitialInvestment(parseFloat(value) || 0)}
                min={1}
                step={100}
                prefix="$"
                helperText="Amount invested initially"
              />
              
              <CalculatorInput
                id="final-value"
                label="Final Value"
                type="number"
                value={finalValue}
                onChange={(value) => setFinalValue(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Final value of the investment"
              />
              
              <Button 
                onClick={calculateBasicROI}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {basicResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Return on Investment (ROI)"
                        value={`${basicResults.roi.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Net Gain/Loss"
                        value={`$${basicResults.gain.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        className={basicResults.gain >= 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                      />
                      
                      <div className="pt-4 text-sm">
                        {basicResults.roi >= 0 ? (
                          <p>This investment has a positive return. For every $1 invested, you earn approximately ${(basicResults.roi / 100).toFixed(2)} in return.</p>
                        ) : (
                          <p>This investment has a negative return, indicating a loss on your initial investment.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Annualized ROI */}
        <TabsContent value="annualized-roi" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="annual-investment"
                label="Initial Investment"
                type="number"
                value={annualInvestment}
                onChange={(value) => setAnnualInvestment(parseFloat(value) || 0)}
                min={1}
                step={100}
                prefix="$"
                helperText="Amount invested initially"
              />
              
              <CalculatorInput
                id="annual-final-value"
                label="Final Value"
                type="number"
                value={annualFinalValue}
                onChange={(value) => setAnnualFinalValue(parseFloat(value) || 0)}
                min={0}
                step={100}
                prefix="$"
                helperText="Final value of the investment"
              />
              
              <CalculatorInput
                id="time-period"
                label="Time Period"
                type="number"
                value={timePeriod}
                onChange={(value) => setTimePeriod(parseFloat(value) || 0)}
                min={0.1}
                step={0.1}
                suffix=" years"
                helperText="Duration of the investment in years"
              />
              
              <Button 
                onClick={calculateAnnualizedROI}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {annualizedResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Total ROI"
                        value={`${annualizedResults.totalROI.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Annualized ROI"
                        value={`${annualizedResults.annualizedROI.toFixed(2)}%`}
                        icon={<Calculator className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Net Gain/Loss"
                        value={`$${annualizedResults.totalGain.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        className={annualizedResults.totalGain >= 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                      />
                      
                      <div className="pt-4 text-sm">
                        <p>Over {timePeriod} {timePeriod === 1 ? 'year' : 'years'}, this investment provides an average annual return of {annualizedResults.annualizedROI.toFixed(2)}%.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
};

export default ROICalculator;
