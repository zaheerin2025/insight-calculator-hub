
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SalesTaxCalculator: React.FC = () => {
  // Tab 1: Calculate Tax Amount and Total
  const [price, setPrice] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(8.25);
  const [taxResults, setTaxResults] = useState<{
    taxAmount: number;
    totalPrice: number;
  } | null>(null);
  
  // Tab 2: Calculate Pre-Tax Price
  const [totalWithTax, setTotalWithTax] = useState<number>(108.25);
  const [preTaxRate, setPreTaxRate] = useState<number>(8.25);
  const [preTaxResults, setPreTaxResults] = useState<{
    preTaxPrice: number;
    taxAmount: number;
  } | null>(null);
  
  // Calculate tax amount and total price
  const calculateTax = () => {
    try {
      if (isNaN(price) || isNaN(taxRate) || price < 0 || taxRate < 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const taxAmount = (price * taxRate) / 100;
      const totalPrice = price + taxAmount;
      
      setTaxResults({
        taxAmount,
        totalPrice
      });
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate pre-tax price from total with tax
  const calculatePreTax = () => {
    try {
      if (isNaN(totalWithTax) || isNaN(preTaxRate) || totalWithTax <= 0 || preTaxRate < 0) {
        toast.error('Please enter valid positive numbers');
        return;
      }
      
      const preTaxPrice = totalWithTax / (1 + (preTaxRate / 100));
      const taxAmount = totalWithTax - preTaxPrice;
      
      setPreTaxResults({
        preTaxPrice,
        taxAmount
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
    "name": "Sales Tax Calculator",
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
      title="Sales Tax Calculator"
      description="Calculate sales tax for different states and jurisdictions with our easy-to-use sales tax calculator."
      intro="Our sales tax calculator helps you determine the exact amount of tax to be added to a purchase, or find the pre-tax price from a total that includes tax."
      formula={
        <div>
          <p>The sales tax calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Tax Amount:</strong></p>
            <code>Tax Amount = Pre-tax Price × (Tax Rate / 100)</code>
            
            <p className="mt-3"><strong>Total Price with Tax:</strong></p>
            <code>Total Price = Pre-tax Price + Tax Amount</code>
            
            <p className="mt-3"><strong>Pre-tax Price from Total:</strong></p>
            <code>Pre-tax Price = Total Price / (1 + (Tax Rate / 100))</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How does sales tax work?",
          answer: "Sales tax is a consumption tax imposed by the government on the sale of goods and services. The seller collects the tax from the customer and then pays it to the government. Sales tax rates vary by state, county, and even city in the U.S."
        },
        {
          question: "Are all items subject to sales tax?",
          answer: "No, many states exempt certain items like groceries, prescription medications, and certain clothing. Additionally, some customers like non-profit organizations or resellers might be exempt from paying sales tax."
        },
        {
          question: "How accurate is this sales tax calculator?",
          answer: "This calculator provides accurate calculations based on the tax rate you input. However, since sales tax rates vary by location and can change over time, you should verify the current tax rate for your specific location."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/business/sales-tax-calculator"
    >
      <Tabs defaultValue="calculate-tax" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate-tax">Calculate Tax Amount</TabsTrigger>
          <TabsTrigger value="calculate-pretax">Calculate Pre-Tax Price</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Calculate Tax Amount */}
        <TabsContent value="calculate-tax" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="price"
                label="Price (Before Tax)"
                type="number"
                value={price}
                onChange={(value) => setPrice(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                prefix="$"
                helperText="Price of goods or services before tax"
              />
              
              <CalculatorInput
                id="tax-rate"
                label="Tax Rate"
                type="number"
                value={taxRate}
                onChange={(value) => setTaxRate(parseFloat(value) || 0)}
                min={0}
                max={100}
                step={0.01}
                suffix="%"
                helperText="Sales tax rate in your location"
              />
              
              <Button 
                onClick={calculateTax}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Tax
              </Button>
            </div>
            
            <div>
              {taxResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Sales Tax Amount"
                        value={`$${taxResults.taxAmount.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Total Price with Tax"
                        value={`$${taxResults.totalPrice.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>With a sales tax rate of {taxRate}%, you will pay ${taxResults.taxAmount.toFixed(2)} in taxes on your purchase of ${price.toFixed(2)}.</p>
                      <p className="mt-2">Your total price including tax is ${taxResults.totalPrice.toFixed(2)}.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Calculate Pre-Tax Price */}
        <TabsContent value="calculate-pretax" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="total-with-tax"
                label="Total Price (Including Tax)"
                type="number"
                value={totalWithTax}
                onChange={(value) => setTotalWithTax(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                prefix="$"
                helperText="Total price including sales tax"
              />
              
              <CalculatorInput
                id="pretax-rate"
                label="Tax Rate"
                type="number"
                value={preTaxRate}
                onChange={(value) => setPreTaxRate(parseFloat(value) || 0)}
                min={0}
                max={100}
                step={0.01}
                suffix="%"
                helperText="Sales tax rate in your location"
              />
              
              <Button 
                onClick={calculatePreTax}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Pre-Tax Price
              </Button>
            </div>
            
            <div>
              {preTaxResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Pre-Tax Price"
                        value={`$${preTaxResults.preTaxPrice.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Sales Tax Amount"
                        value={`$${preTaxResults.taxAmount.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
                      <p>From your total price of ${totalWithTax.toFixed(2)} with a tax rate of {preTaxRate}%:</p>
                      <p className="mt-2">The pre-tax price is ${preTaxResults.preTaxPrice.toFixed(2)}.</p>
                      <p className="mt-2">The sales tax amount is ${preTaxResults.taxAmount.toFixed(2)}.</p>
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

export default SalesTaxCalculator;
