
import React, { useState, useMemo } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';
import { Percent, Calculator, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DiscountCalculator: React.FC = () => {
  // Tab 1: Calculate discounted price
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [discountResults, setDiscountResults] = useState<{
    discountAmount: number;
    finalPrice: number;
  } | null>(null);
  
  // Tab 2: Calculate original price from discounted price
  const [finalPrice, setFinalPrice] = useState<number>(80);
  const [discountPercentReverse, setDiscountPercentReverse] = useState<number>(20);
  const [originalPriceResult, setOriginalPriceResult] = useState<number | null>(null);
  
  // Tab 3: Calculate discount percentage
  const [originalPriceForPercent, setOriginalPriceForPercent] = useState<number>(100);
  const [discountedPrice, setDiscountedPrice] = useState<number>(80);
  const [discountPercentResult, setDiscountPercentResult] = useState<number | null>(null);
  
  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    try {
      if (isNaN(originalPrice) || isNaN(discountPercent)) {
        toast.error('Please enter valid numbers');
        return;
      }
      
      const discountAmount = (originalPrice * discountPercent) / 100;
      const finalPrice = originalPrice - discountAmount;
      
      setDiscountResults({
        discountAmount,
        finalPrice
      });
      
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate original price
  const calculateOriginalPrice = () => {
    try {
      if (isNaN(finalPrice) || isNaN(discountPercentReverse) || discountPercentReverse >= 100) {
        toast.error('Please enter valid numbers (discount must be less than 100%)');
        return;
      }
      
      const original = finalPrice / (1 - discountPercentReverse / 100);
      setOriginalPriceResult(original);
      toast.success('Calculation complete!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };
  
  // Calculate discount percentage
  const calculateDiscountPercent = () => {
    try {
      if (isNaN(originalPriceForPercent) || isNaN(discountedPrice) || originalPriceForPercent <= 0) {
        toast.error('Please enter valid numbers (original price must be greater than zero)');
        return;
      }
      
      if (discountedPrice > originalPriceForPercent) {
        toast.error('Discounted price cannot be greater than original price');
        return;
      }
      
      const percent = ((originalPriceForPercent - discountedPrice) / originalPriceForPercent) * 100;
      setDiscountPercentResult(percent);
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
    "name": "Discount Calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web Browser"
  };

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate discounted prices, original prices, or discount percentages with our versatile discount calculator. Perfect for shopping and sales analysis."
      intro="Our discount calculator helps you find the final price after a discount, determine the original price when you know the final price and discount rate, or calculate the discount percentage when you know both prices."
      formula={
        <div>
          <p>The discount calculations use the following formulas:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>Discount Amount:</strong></p>
            <code>Discount Amount = Original Price × (Discount Percentage / 100)</code>
            
            <p className="mt-3"><strong>Final Price After Discount:</strong></p>
            <code>Final Price = Original Price - Discount Amount</code>
            <p className="mt-1">or</p>
            <code>Final Price = Original Price × (1 - Discount Percentage / 100)</code>
            
            <p className="mt-3"><strong>Original Price from Final Price:</strong></p>
            <code>Original Price = Final Price / (1 - Discount Percentage / 100)</code>
            
            <p className="mt-3"><strong>Discount Percentage:</strong></p>
            <code>Discount Percentage = ((Original Price - Final Price) / Original Price) × 100</code>
          </div>
        </div>
      }
      faq={[
        {
          question: "How do I calculate how much I saved with a discount?",
          answer: "To calculate your savings, multiply the original price by the discount percentage (divided by 100). For example, for a $100 item with a 20% discount, you save $100 × 0.2 = $20."
        },
        {
          question: "How do I calculate the original price when I only know the final price and discount percentage?",
          answer: "Divide the final price by (1 - discount percentage/100). For example, if the final price is $80 with a 20% discount: $80 ÷ (1 - 20/100) = $80 ÷ 0.8 = $100."
        },
        {
          question: "How do I find the discount percentage when I know the original and final prices?",
          answer: "Subtract the final price from the original price, then divide by the original price and multiply by 100. For example: if an item was $100 and now costs $75, the discount is ((100 - 75) ÷ 100) × 100 = 25%."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/math/discount-calculator"
    >
      <Tabs defaultValue="discounted-price" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discounted-price">Calculate Discounted Price</TabsTrigger>
          <TabsTrigger value="original-price">Find Original Price</TabsTrigger>
          <TabsTrigger value="discount-percent">Find Discount Percentage</TabsTrigger>
        </TabsList>
        
        {/* Tab 1: Calculate discounted price */}
        <TabsContent value="discounted-price" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="original-price"
                label="Original Price"
                type="number"
                value={originalPrice}
                onChange={(value) => setOriginalPrice(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                prefix="$"
                helperText="Enter the price before discount"
              />
              
              <CalculatorInput
                id="discount-percent"
                label="Discount Percentage"
                type="number"
                value={discountPercent}
                onChange={(value) => setDiscountPercent(parseFloat(value) || 0)}
                min={0}
                max={100}
                step={0.1}
                suffix="%"
                helperText="Enter the discount percentage"
              />
              
              <Button 
                onClick={calculateDiscountedPrice}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {discountResults && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Discount Amount"
                        value={`$${discountResults.discountAmount.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Final Price"
                        value={`$${discountResults.finalPrice.toFixed(2)}`}
                        icon={<Calculator className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="You Save"
                        value={`${(discountPercent).toFixed(1)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 2: Calculate original price */}
        <TabsContent value="original-price" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="final-price"
                label="Final (Sale) Price"
                type="number"
                value={finalPrice}
                onChange={(value) => setFinalPrice(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                prefix="$"
                helperText="Enter the price after discount"
              />
              
              <CalculatorInput
                id="discount-percent-reverse"
                label="Discount Percentage"
                type="number"
                value={discountPercentReverse}
                onChange={(value) => setDiscountPercentReverse(parseFloat(value) || 0)}
                min={0}
                max={99.99}
                step={0.1}
                suffix="%"
                helperText="Enter the discount percentage"
              />
              
              <Button 
                onClick={calculateOriginalPrice}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {originalPriceResult !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Original Price"
                        value={`$${originalPriceResult.toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="You Saved"
                        value={`$${(originalPriceResult - finalPrice).toFixed(2)}`}
                        icon={<Calculator className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="Discount"
                        value={`${discountPercentReverse.toFixed(1)}%`}
                        icon={<Percent className="h-5 w-5" />}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Tab 3: Calculate discount percentage */}
        <TabsContent value="discount-percent" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                id="original-price-for-percent"
                label="Original Price"
                type="number"
                value={originalPriceForPercent}
                onChange={(value) => setOriginalPriceForPercent(parseFloat(value) || 0)}
                min={0.01}
                step={0.01}
                prefix="$"
                helperText="Enter the original price"
              />
              
              <CalculatorInput
                id="discounted-price"
                label="Discounted Price"
                type="number"
                value={discountedPrice}
                onChange={(value) => setDiscountedPrice(parseFloat(value) || 0)}
                min={0}
                step={0.01}
                prefix="$"
                helperText="Enter the price after discount"
              />
              
              <Button 
                onClick={calculateDiscountPercent}
                className="w-full bg-primary hover:bg-primary-hover text-white mt-2"
              >
                Calculate
              </Button>
            </div>
            
            <div>
              {discountPercentResult !== null && (
                <Card className="animate-fade-in h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-medium mb-4">Results</h3>
                    
                    <div className="space-y-3">
                      <ResultDisplay
                        label="Discount Percentage"
                        value={`${discountPercentResult.toFixed(2)}%`}
                        icon={<Percent className="h-5 w-5" />}
                        isHighlighted={true}
                      />
                      
                      <ResultDisplay
                        label="Discount Amount"
                        value={`$${(originalPriceForPercent - discountedPrice).toFixed(2)}`}
                        icon={<DollarSign className="h-5 w-5" />}
                      />
                      
                      <ResultDisplay
                        label="You Saved"
                        value={`${discountPercentResult.toFixed(2)}% off original price`}
                        icon={<Calculator className="h-5 w-5" />}
                      />
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

export default DiscountCalculator;
