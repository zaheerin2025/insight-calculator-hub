
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Calculator } from 'lucide-react';

const InventoryTurnoverCalculator: React.FC = () => {
  // Input values
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(500000);
  const [startingInventory, setStartingInventory] = useState<number>(100000);
  const [endingInventory, setEndingInventory] = useState<number>(90000);
  const [timePeriodDays, setTimePeriodDays] = useState<number>(365);
  
  // Results
  const [results, setResults] = useState<{
    averageInventory: number;
    inventoryTurnoverRatio: number;
    daysToSellInventory: number;
  } | null>(null);
  
  // Calculate inventory turnover
  const calculateInventoryTurnover = () => {
    try {
      if (
        isNaN(costOfGoodsSold) || 
        isNaN(startingInventory) || 
        isNaN(endingInventory) || 
        isNaN(timePeriodDays) ||
        costOfGoodsSold < 0 ||
        startingInventory < 0 ||
        endingInventory < 0 ||
        timePeriodDays <= 0
      ) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const averageInventory = (startingInventory + endingInventory) / 2;
      
      if (averageInventory === 0) {
        toast.error('Average inventory cannot be zero');
        return;
      }
      
      const inventoryTurnoverRatio = costOfGoodsSold / averageInventory;
      const daysToSellInventory = timePeriodDays / inventoryTurnoverRatio;
      
      setResults({
        averageInventory,
        inventoryTurnoverRatio,
        daysToSellInventory
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
    "name": "Inventory Turnover Calculator",
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
      title="Inventory Turnover Calculator"
      description="Calculate how efficiently inventory is managed by measuring how many times inventory is sold in a period."
      intro="Our inventory turnover calculator helps businesses evaluate inventory management efficiency by calculating how quickly inventory is sold and replaced during a specific time period."
      formula={
        <div>
          <p>The inventory turnover calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Average Inventory:</strong></p>
            <code>Average Inventory = (Starting Inventory + Ending Inventory) ÷ 2</code>
            
            <p className="mt-3"><strong>Inventory Turnover Ratio:</strong></p>
            <code>Inventory Turnover Ratio = Cost of Goods Sold ÷ Average Inventory</code>
            
            <p className="mt-3"><strong>Days Sales of Inventory (DSI):</strong></p>
            <code>DSI = Time Period in Days ÷ Inventory Turnover Ratio</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "What is a good inventory turnover ratio?",
          answer: "A good inventory turnover ratio varies by industry. Generally, retail and grocery sectors aim for higher ratios (15-20+), while sectors with higher-value items like automobiles or furniture might have lower ratios (4-6). Higher ratios typically indicate efficient inventory management, but extremely high ratios might suggest understocking."
        },
        {
          question: "How can I improve my inventory turnover ratio?",
          answer: "You can improve your inventory turnover by optimizing purchasing practices, improving sales forecasting, implementing just-in-time inventory systems, identifying and addressing slow-moving items, and using inventory management software to track and analyze inventory performance."
        },
        {
          question: "Why is the days sales of inventory (DSI) important?",
          answer: "DSI indicates how long it takes to convert inventory into sales. A lower DSI suggests efficient inventory management and less capital tied up in inventory. It also helps businesses understand how quickly they can respond to market changes and identify potential cash flow issues related to slow-moving inventory."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/inventory-turnover-calculator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="cost-of-goods-sold"
            label="Cost of Goods Sold (COGS)"
            type="number"
            value={costOfGoodsSold}
            onChange={(value) => setCostOfGoodsSold(parseFloat(value) || 0)}
            min={0}
            step={1000}
            prefix="$"
            helperText="Total cost of items sold during the period"
          />
          
          <CalculatorInput
            id="starting-inventory"
            label="Starting Inventory Value"
            type="number"
            value={startingInventory}
            onChange={(value) => setStartingInventory(parseFloat(value) || 0)}
            min={0}
            step={1000}
            prefix="$"
            helperText="Inventory value at the beginning of the period"
          />
          
          <CalculatorInput
            id="ending-inventory"
            label="Ending Inventory Value"
            type="number"
            value={endingInventory}
            onChange={(value) => setEndingInventory(parseFloat(value) || 0)}
            min={0}
            step={1000}
            prefix="$"
            helperText="Inventory value at the end of the period"
          />
          
          <CalculatorInput
            id="time-period"
            label="Time Period"
            type="number"
            value={timePeriodDays}
            onChange={(value) => setTimePeriodDays(parseFloat(value) || 365)}
            min={1}
            step={1}
            suffix=" days"
            helperText="Number of days in the analysis period (typically 365 for annual)"
          />
          
          <Button 
            onClick={calculateInventoryTurnover}
            className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Inventory Turnover
          </Button>
        </div>
        
        <div>
          {results && (
            <Card className="animate-fade-in h-full">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <h3 className="text-lg font-medium mb-4">Results</h3>
                
                <div className="space-y-3">
                  <ResultDisplay
                    label="Average Inventory"
                    value={`$${results.averageInventory.toFixed(2)}`}
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                  
                  <ResultDisplay
                    label="Inventory Turnover Ratio"
                    value={results.inventoryTurnoverRatio.toFixed(2)}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                  
                  <ResultDisplay
                    label="Days Sales of Inventory (DSI)"
                    value={`${results.daysToSellInventory.toFixed(1)} days`}
                    icon={<Calculator className="h-5 w-5" />}
                    isHighlighted={true}
                  />
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                  <p>Your inventory turns over {results.inventoryTurnoverRatio.toFixed(2)} times during the {timePeriodDays}-day period.</p>
                  <p className="mt-2">On average, it takes {results.daysToSellInventory.toFixed(1)} days to sell through your entire inventory.</p>
                  
                  {results.inventoryTurnoverRatio < 4 && (
                    <p className="mt-2 text-amber-600">Your inventory turnover ratio is relatively low, which may indicate overstocking or slow-moving inventory.</p>
                  )}
                  
                  {results.inventoryTurnoverRatio > 10 && (
                    <p className="mt-2 text-green-600">Your inventory turnover ratio is relatively high, which generally indicates efficient inventory management.</p>
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

export default InventoryTurnoverCalculator;
