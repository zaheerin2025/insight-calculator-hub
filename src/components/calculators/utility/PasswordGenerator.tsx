
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CalculatorLayout from '@/components/calculators/CalculatorLayout';
import ResultDisplay from '@/components/calculators/ResultDisplay';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<string>('Medium');
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<string>('bg-yellow-500');
  
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';
    
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Ensure at least one character type is selected
    if (charset === '') {
      setIncludeLowercase(true);
      charset = 'abcdefghijklmnopqrstuvwxyz';
    }
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    setPassword(newPassword);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };
  
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    
    // Length factor
    if (length > 10) strength += 1;
    if (length > 16) strength += 1;
    
    // Character types factors
    if (includeUppercase) strength += 1;
    if (includeLowercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    
    // Set strength level and color
    if (strength <= 2) {
      setPasswordStrength('Weak');
      setPasswordStrengthColor('bg-red-500');
    } else if (strength <= 4) {
      setPasswordStrength('Medium');
      setPasswordStrengthColor('bg-yellow-500');
    } else {
      setPasswordStrength('Strong');
      setPasswordStrengthColor('bg-green-500');
    }
  }, [password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Create strong, secure passwords with customizable options for length and character types."
      intro="Generate secure passwords with specific requirements. Customize the length and include uppercase letters, lowercase letters, numbers, and special symbols."
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Password Generator
          </CardTitle>
          <CardDescription>
            Create strong, secure passwords with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              value={password}
              readOnly
              className="pr-20 font-mono text-base"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label>Password Strength:</Label>
              <span>{passwordStrength}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${passwordStrengthColor} transition-all duration-300`}
                style={{ width: `${(passwordStrength === 'Weak' ? 33 : passwordStrength === 'Medium' ? 66 : 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between">
                <Label htmlFor="length">Length: {length} characters</Label>
              </div>
              <Slider
                id="length"
                min={6}
                max={32}
                step={1}
                defaultValue={[length]}
                onValueChange={(values) => setLength(values[0])}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="uppercase">Include Uppercase Letters</Label>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="lowercase">Include Lowercase Letters</Label>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="numbers">Include Numbers</Label>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="symbols">Include Symbols</Label>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>
            </div>
            
            <Button 
              variant="default" 
              className="w-full"
              onClick={generatePassword}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
};

export default PasswordGenerator;
