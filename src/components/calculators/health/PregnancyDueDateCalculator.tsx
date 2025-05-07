
import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, addWeeks, subWeeks, differenceInDays, differenceInWeeks, isValid, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ResultDisplay from '../ResultDisplay';
import { toast } from 'sonner';

const PregnancyDueDateCalculator: React.FC = () => {
  const [calculationMethod, setCalculationMethod] = useState<string>("lmp");
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(undefined);
  const [ultrasoundDate, setUltrasoundDate] = useState<Date | undefined>(undefined);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(8);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);
  
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [gestationalAge, setGestationalAge] = useState<{ weeks: number; days: number } | null>(null);
  const [trimester, setTrimester] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateDueDate = () => {
    try {
      let calculatedDueDate: Date | null = null;
      
      switch (calculationMethod) {
        case "lmp":
          if (!lmpDate) {
            toast.error("Please select last menstrual period date");
            return;
          }
          // Naegele's rule: Add 280 days (40 weeks) to the first day of the LMP
          calculatedDueDate = addDays(lmpDate, 280);
          break;
          
        case "conception":
          if (!conceptionDate) {
            toast.error("Please select conception date");
            return;
          }
          // Add 266 days (38 weeks) to conception date
          calculatedDueDate = addDays(conceptionDate, 266);
          break;
          
        case "ultrasound":
          if (!ultrasoundDate) {
            toast.error("Please select ultrasound date");
            return;
          }
          if (ultrasoundWeeks < 0 || ultrasoundWeeks > 40) {
            toast.error("Gestational age weeks must be between 0 and 40");
            return;
          }
          if (ultrasoundDays < 0 || ultrasoundDays > 6) {
            toast.error("Gestational age days must be between 0 and 6");
            return;
          }
          
          // Calculate due date based on ultrasound
          // First, determine the gestational age at ultrasound in days
          const gestationalAgeInDays = (ultrasoundWeeks * 7) + ultrasoundDays;
          
          // Then, determine conception date by subtracting gestational age from ultrasound date
          const estimatedConceptionDate = subWeeks(ultrasoundDate, ultrasoundWeeks);
          const adjustedConceptionDate = subDays(estimatedConceptionDate, ultrasoundDays);
          
          // Finally, add 266 days (38 weeks) to the estimated conception date
          calculatedDueDate = addDays(adjustedConceptionDate, 266);
          break;
      }
      
      if (calculatedDueDate) {
        setDueDate(calculatedDueDate);
        
        // Calculate gestational age
        const today = new Date();
        let gestationalDays = 0;
        
        if (calculationMethod === "lmp" && lmpDate) {
          gestationalDays = differenceInDays(today, lmpDate);
        } else if (calculationMethod === "conception" && conceptionDate) {
          gestationalDays = differenceInDays(today, conceptionDate) + 14; // Add 14 days to conception date
        } else if (calculationMethod === "ultrasound" && ultrasoundDate) {
          const gestationalAgeAtUltrasound = (ultrasoundWeeks * 7) + ultrasoundDays;
          gestationalDays = gestationalAgeAtUltrasound + differenceInDays(today, ultrasoundDate);
        }
        
        // Convert to weeks and days
        const weeks = Math.floor(gestationalDays / 7);
        const days = gestationalDays % 7;
        
        // Set gestational age
        setGestationalAge({ weeks, days });
        
        // Determine trimester
        if (weeks < 13) {
          setTrimester("First Trimester (Weeks 0-13)");
        } else if (weeks < 27) {
          setTrimester("Second Trimester (Weeks 14-27)");
        } else {
          setTrimester("Third Trimester (Weeks 28-40+)");
        }
        
        setIsCalculated(true);
        toast.success("Due date calculated successfully!");
      }
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("An error occurred during calculation");
    }
  };
  
  return (
    <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      description="Calculate your estimated due date based on last menstrual period, conception date, or ultrasound measurements."
      intro="This calculator helps you estimate your pregnancy due date using different methods, including last menstrual period, conception date, or ultrasound measurements."
      formula={
        <div>
          <p className="mb-4">This calculator uses three common methods to estimate a pregnancy due date:</p>
          
          <div className="bg-muted p-4 rounded-md my-4 space-y-4">
            <div>
              <p className="font-medium">1. Naegele's Rule (Last Menstrual Period)</p>
              <p className="mt-1">Add 7 days to the first day of your last menstrual period, then add 9 months.</p>
              <p className="text-sm text-muted-foreground mt-1">Mathematically: LMP + 280 days (40 weeks)</p>
            </div>
            
            <div>
              <p className="font-medium">2. Conception Date</p>
              <p className="mt-1">Add 266 days (38 weeks) to the date of conception.</p>
              <p className="text-sm text-muted-foreground mt-1">This is more accurate if you know the exact conception date.</p>
            </div>
            
            <div>
              <p className="font-medium">3. Ultrasound Dating</p>
              <p className="mt-1">Uses the gestational age determined by an ultrasound to calculate the due date.</p>
              <p className="text-sm text-muted-foreground mt-1">Earlier ultrasounds (first trimester) provide more accurate dating.</p>
            </div>
          </div>
          
          <p className="mt-4">Keep in mind that only about 4% of pregnancies deliver exactly on the due date. Most births occur within two weeks before or after.</p>
        </div>
      }
      faq={[
        {
          question: "How accurate is the due date calculation?",
          answer: "Due dates are estimates. Only about 4-5% of women deliver exactly on their due date. Most births occur within two weeks before or after the estimated date. First trimester ultrasounds provide the most accurate dating, while last menstrual period calculations can be off by up to two weeks, especially for women with irregular cycles."
        },
        {
          question: "Which calculation method is most accurate?",
          answer: "Early ultrasound dating (before 14 weeks) is generally the most accurate method. Conception date can be very accurate if known precisely. The last menstrual period method is less accurate, especially for women with irregular cycles or who cannot recall the exact date of their last period."
        },
        {
          question: "My due date calculated by my doctor is different. Why?",
          answer: "Doctors consider multiple factors when determining due dates, including physical exams, ultrasound measurements from different trimesters, and your medical history. They may also adjust dates based on your pregnancy progression. Always follow your healthcare provider's guidance."
        },
        {
          question: "What is gestational age vs. fetal age?",
          answer: "Gestational age is counted from the first day of your last menstrual period and is typically 2 weeks longer than fetal age. Fetal age (embryonic age) is the actual age of the developing baby, counted from conception. Medical providers generally use gestational age for pregnancy dating."
        }
      ]}
    >
      <div className="space-y-6">
        <Tabs value={calculationMethod} onValueChange={setCalculationMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lmp">Last Period</TabsTrigger>
            <TabsTrigger value="conception">Conception</TabsTrigger>
            <TabsTrigger value="ultrasound">Ultrasound</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lmp" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="lmp-date">First Day of Last Menstrual Period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !lmpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lmpDate ? format(lmpDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={lmpDate}
                    onSelect={setLmpDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                The first day of your most recent menstrual period
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="conception" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="conception-date">Conception Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !conceptionDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {conceptionDate ? format(conceptionDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={conceptionDate}
                    onSelect={setConceptionDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                The estimated date when fertilization occurred
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="ultrasound" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="ultrasound-date">Ultrasound Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !ultrasoundDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {ultrasoundDate ? format(ultrasoundDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={ultrasoundDate}
                    onSelect={setUltrasoundDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                The date of your ultrasound scan
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Gestational Age at Ultrasound</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ultrasound-weeks">Weeks</Label>
                  <Input
                    id="ultrasound-weeks"
                    type="number"
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(parseInt(e.target.value) || 0)}
                    min={0}
                    max={40}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ultrasound-days">Days</Label>
                  <Input
                    id="ultrasound-days"
                    type="number"
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(parseInt(e.target.value) || 0)}
                    min={0}
                    max={6}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                The gestational age determined by the ultrasound
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center">
          <Button 
            onClick={calculateDueDate}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8"
          >
            Calculate Due Date
          </Button>
        </div>
        
        {isCalculated && dueDate && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <ResultDisplay
                label="Estimated Due Date"
                value={format(dueDate, "MMMM d, yyyy")}
                description={`Calculated using the ${
                  calculationMethod === "lmp" ? "last menstrual period" :
                  calculationMethod === "conception" ? "conception date" :
                  "ultrasound measurements"
                } method`}
                icon={<span className="text-2xl">👶</span>}
                isHighlighted={true}
              />
              
              {gestationalAge && (
                <div className="mt-4 p-6 border rounded-md bg-muted/20">
                  <h3 className="font-semibold mb-4">Pregnancy Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Gestational Age</p>
                        <p className="text-xl font-medium">
                          {gestationalAge.weeks} weeks, {gestationalAge.days} days
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Trimester</p>
                        <p className="text-xl font-medium">{trimester}</p>
                      </div>
                    </div>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Important Pregnancy Milestones</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>End of first trimester:</span> 
                            <span className="font-medium">Week 13</span>
                          </li>
                          <li className="flex justify-between">
                            <span>End of second trimester:</span> 
                            <span className="font-medium">Week 27</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Full term:</span> 
                            <span className="font-medium">Week 39-40</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Remember that only about 4% of pregnancies deliver exactly on the due date. 
                      Most births occur within two weeks before or after this date. Always consult with 
                      your healthcare provider for personalized guidance during your pregnancy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PregnancyDueDateCalculator;
