
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, differenceInDays, differenceInMonths, differenceInYears, addDays, addMonths, addYears, formatDistance } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import ResultDisplay from '@/components/calculators/ResultDisplay';

const DateCalculator: React.FC = () => {
  // Tab 1: Date Difference
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [diffResult, setDiffResult] = useState<string | null>(null);
  
  // Tab 2: Add/Subtract
  const [baseDate, setBaseDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [addSubResult, setAddSubResult] = useState<string | null>(null);

  const calculateDateDifference = () => {
    if (startDate && endDate) {
      const daysDiff = Math.abs(differenceInDays(endDate, startDate));
      const monthsDiff = Math.abs(differenceInMonths(endDate, startDate));
      const yearsDiff = Math.abs(differenceInYears(endDate, startDate));
      
      const formattedStart = format(startDate, 'PPP');
      const formattedEnd = format(endDate, 'PPP');
      const humanReadable = formatDistance(startDate, endDate, { addSuffix: false });
      
      setDiffResult(`From ${formattedStart} to ${formattedEnd}: ${daysDiff} days (${humanReadable}), or approximately ${monthsDiff} months, or ${yearsDiff} years`);
    }
  };

  const calculateDateAddSubtract = () => {
    if (baseDate) {
      let resultDate = new Date(baseDate);
      
      if (operation === 'add') {
        resultDate = addYears(resultDate, years);
        resultDate = addMonths(resultDate, months);
        resultDate = addDays(resultDate, days);
      } else {
        resultDate = addYears(resultDate, -years);
        resultDate = addMonths(resultDate, -months);
        resultDate = addDays(resultDate, -days);
      }
      
      const formattedBase = format(baseDate, 'PPP');
      const formattedResult = format(resultDate, 'PPP');
      const operationText = operation === 'add' ? 'Adding' : 'Subtracting';
      
      let changeText = [];
      if (years) changeText.push(`${years} years`);
      if (months) changeText.push(`${months} months`);
      if (days) changeText.push(`${days} days`);
      
      setAddSubResult(`${operationText} ${changeText.join(', ')} to ${formattedBase} results in: ${formattedResult}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Calculator</CardTitle>
        <CardDescription>
          Calculate date differences or add/subtract time from dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="difference" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="difference">Date Difference</TabsTrigger>
            <TabsTrigger value="addsubtract">Add/Subtract</TabsTrigger>
          </TabsList>
          
          <TabsContent value="difference" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button onClick={calculateDateDifference} className="w-full">
              Calculate Difference
            </Button>

            {diffResult && (
              <ResultDisplay
                title="Date Difference"
                value={diffResult}
              />
            )}
          </TabsContent>
          
          <TabsContent value="addsubtract" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseDate">Base Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {baseDate ? format(baseDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={baseDate}
                      onSelect={setBaseDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={operation === 'add' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setOperation('add')}
                >
                  Add
                </Button>
                <Button
                  variant={operation === 'subtract' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => setOperation('subtract')}
                >
                  Subtract
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="number"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="months">Months</Label>
                  <Input
                    id="months"
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years">Years</Label>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateDateAddSubtract} className="w-full">
                Calculate New Date
              </Button>

              {addSubResult && (
                <ResultDisplay
                  title="Result"
                  value={addSubResult}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DateCalculator;
