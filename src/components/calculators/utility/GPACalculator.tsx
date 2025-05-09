
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Calculator } from 'lucide-react';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import ResultDisplay from '@/components/calculators/ResultDisplay';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0
};

const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Course 1', grade: 'A', credits: 3 },
    { id: 2, name: 'Course 2', grade: 'B+', credits: 4 }
  ]);
  const [gpa, setGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number | null>(null);
  const [totalGradePoints, setTotalGradePoints] = useState<number | null>(null);

  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: `Course ${newId}`, grade: 'A', credits: 3 }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let credits = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade] * course.credits;
      totalPoints += points;
      credits += course.credits;
    });

    const calculatedGPA = credits > 0 ? totalPoints / credits : 0;
    
    setGPA(parseFloat(calculatedGPA.toFixed(2)));
    setTotalCredits(credits);
    setTotalGradePoints(parseFloat(totalPoints.toFixed(2)));
  };

  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average (GPA) based on course grades and credit hours."
      intro="Enter your courses, grades, and credit hours to calculate your GPA. Add or remove courses as needed."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            GPA Calculator
          </CardTitle>
          <CardDescription>
            Calculate your Grade Point Average (GPA) based on your courses and credit hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <Label htmlFor={`course-${course.id}`} className="sr-only">Course Name</Label>
                  <Input
                    id={`course-${course.id}`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course Name"
                  />
                </div>
                
                <div className="col-span-3">
                  <Label htmlFor={`grade-${course.id}`} className="sr-only">Grade</Label>
                  <Select
                    value={course.grade}
                    onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                  >
                    <SelectTrigger id={`grade-${course.id}`}>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade].toFixed(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-3">
                  <Label htmlFor={`credits-${course.id}`} className="sr-only">Credits</Label>
                  <Input
                    id={`credits-${course.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    placeholder="Credits"
                  />
                </div>
                
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline"
              onClick={addCourse}
              className="sm:w-1/2"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
            
            <Button 
              variant="default"
              onClick={calculateGPA}
              className="sm:w-1/2"
            >
              Calculate GPA
            </Button>
          </div>
          
          {gpa !== null && (
            <ResultDisplay
              title="GPA Results"
              value={`Your GPA is ${gpa} (${totalGradePoints} grade points ÷ ${totalCredits} credit hours)`}
            />
          )}
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default GPACalculator;
