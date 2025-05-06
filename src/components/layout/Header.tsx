
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 border-b bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            InsightCalc
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <div className="relative group">
            <button className="text-foreground hover:text-primary transition-colors flex items-center">
              Calculators
            </button>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block animate-fade-in z-10">
              <Link to="/calculators/finance" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                Finance
              </Link>
              <Link to="/calculators/health" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                Health
              </Link>
              <Link to="/calculators/math" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                Math
              </Link>
            </div>
          </div>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 pt-10">
              <Link to="/" className="text-lg font-medium">
                Home
              </Link>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Calculators</h3>
                <div className="ml-4 space-y-2">
                  <Link to="/calculators/finance" className="block text-muted-foreground">
                    Finance
                  </Link>
                  <Link to="/calculators/health" className="block text-muted-foreground">
                    Health
                  </Link>
                  <Link to="/calculators/math" className="block text-muted-foreground">
                    Math
                  </Link>
                </div>
              </div>
              <Link to="/about" className="text-lg font-medium">
                About
              </Link>
              <Link to="/contact" className="text-lg font-medium">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
