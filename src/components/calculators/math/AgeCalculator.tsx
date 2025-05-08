
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import CalculatorInput from '@/components/ui/calculator-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { format, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { Calendar } from 'lucide-react';
import ResultDisplay from '../ResultDisplay';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>(format(new Date(2000, 0, 1), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    try {
      const birthDateObj = new Date(birthDate);
      const toDateObj = new Date(toDate);
      
      if (isNaN(birthDateObj.getTime()) || isNaN(toDateObj.getTime())) {
        toast.error('Please enter valid dates');
        return;
      }
      
      if (toDateObj < birthDateObj) {
        toast.error('End date cannot be before birth date');
        return;
      }
      
      const years = differenceInYears(toDateObj, birthDateObj);
      
      // Calculate remaining months after years are subtracted
      const dateAfterYears = new Date(birthDateObj);
      dateAfterYears.setFullYear(dateAfterYears.getFullYear() + years);
      const months = differenceInMonths(toDateObj, dateAfterYears);
      
      // Calculate remaining days after months are subtracted
      const dateAfterMonths = new Date(dateAfterYears);
      dateAfterMonths.setMonth(dateAfterMonths.getMonth() + months);
      const days = differenceInDays(toDateObj, dateAfterMonths);
      
      // Calculate total days
      const totalDays = differenceInDays(toDateObj, birthDateObj);
      
      setResult({ years, months, days, totalDays });
      toast.success('Age calculated successfully!');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('An error occurred during calculation');
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Age Calculator",
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
      title="Age Calculator"
      description="Calculate the exact age between any two dates in years, months, and days with our precise and easy-to-use age calculator."
      intro="Our age calculator determines the exact time span between any two dates, showing the result in years, months, and days. It's perfect for finding someone's age, project timeframes, or any other date-based calculations."
      formula={
        <div>
          <p>The age calculation works as follows:</p>
          <div className="bg-muted p-4 rounded-md my-4 space-y-3 overflow-x-auto">
            <p><strong>1. Calculate complete years:</strong> The number of full years between the two dates.</p>
            <p><strong>2. Calculate remaining months:</strong> After removing complete years, calculate the number of complete months.</p>
            <p><strong>3. Calculate remaining days:</strong> After removing complete years and months, calculate the remaining days.</p>
            <p><strong>4. Calculate total days:</strong> The total number of days between the two dates.</p>
          </div>
        </div>
      }
      faq={[
        {
          question: "How does the age calculator account for leap years?",
          answer: "Our age calculator automatically accounts for leap years by using date-fns, a JavaScript date utility library that properly handles the complexities of the Gregorian calendar, including leap years."
        },
        {
          question: "Can I calculate age for dates in the future?",
          answer: "Yes, you can calculate the time span between any two valid dates, including future dates. This can be useful for project planning, countdown to events, or other future date calculations."
        },
        {
          question: "How accurate is the age calculation?",
          answer: "The calculation is accurate to the day, taking into account varying month lengths, leap years, and other calendar nuances. It provides exact years, months, and days between the selected dates."
        }
      ]}
      schemaMarkup={schemaMarkup}
      canonicalUrl="https://calculators-hub.com/calculators/math/age-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Date Inputs</h3>
            <CalculatorInput
              id="birth-date"
              label="Birth Date / Start Date"
              type="date"
              value={birthDate}
              onChange={(value) => setBirthDate(value)}
              helperText="Select the starting date"
            />
            
            <CalculatorInput
              id="to-date"
              label="Current Date / End Date"
              type="date"
              value={toDate}
              onChange={(value) => setToDate(value)}
              helperText="Select the ending date"
            />
            
            <Button 
              onClick={calculateAge}
              className="w-full bg-primary hover:bg-primary-hover text-white mt-4"
            >
              Calculate Age
            </Button>
          </div>
          
          <div>
            {result && (
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Age Calculation Results</h3>
                  
                  <div className="space-y-3">
                    <ResultDisplay
                      label="Age in Years, Months, and Days"
                      value={`${result.years} ${result.years === 1 ? 'year' : 'years'}, ${result.months} ${result.months === 1 ? 'month' : 'months'}, ${result.days} ${result.days === 1 ? 'day' : 'days'}`}
                      icon={<Calendar className="h-5 w-5" />}
                    />
                    
                    <ResultDisplay
                      label="Total Days"
                      value={`${result.totalDays} ${result.totalDays === 1 ? 'day' : 'days'}`}
                      icon={<Calendar className="h-5 w-5" />}
                    />
                  </div>
                  
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p className="mb-2">From: {format(new Date(birthDate), 'MMMM d, yyyy')}</p>
                    <p>To: {format(new Date(toDate), 'MMMM d, yyyy')}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default AgeCalculator;
