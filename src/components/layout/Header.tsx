
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-10 w-10">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Calculators-Hub
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <div className="relative group">
            <button className="text-foreground font-medium hover:text-primary transition-colors flex items-center">
              Calculators
            </button>
            <div className="absolute top-full left-0 min-w-52 bg-white shadow-lg rounded-md p-3 hidden group-hover:block animate-fade-in z-10 border border-muted">
              <div className="grid grid-cols-1 gap-2">
                <Link to="/calculators/finance" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                  Finance
                </Link>
                <Link to="/calculators/health" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                  Health
                </Link>
                <Link to="/calculators/math" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                  Math
                </Link>
                <Link to="/calculators/business" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                  Business
                </Link>
                <Link to="/calculators/construction" className="block px-4 py-2 hover:bg-muted rounded-md transition-colors">
                  Construction
                </Link>
              </div>
            </div>
          </div>
          <Link to="/blog" className="text-foreground font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-foreground font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground font-medium hover:text-primary transition-colors">
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
            <div className="flex items-center mb-8 mt-4">
              <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-8 w-8 mr-2">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Calculators-Hub</span>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg font-medium">
                Home
              </Link>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Calculators</h3>
                <div className="ml-4 space-y-3 border-l-2 border-muted pl-4">
                  <Link to="/calculators/finance" className="block text-muted-foreground hover:text-primary transition-colors">
                    Finance
                  </Link>
                  <Link to="/calculators/health" className="block text-muted-foreground hover:text-primary transition-colors">
                    Health
                  </Link>
                  <Link to="/calculators/math" className="block text-muted-foreground hover:text-primary transition-colors">
                    Math
                  </Link>
                  <Link to="/calculators/business" className="block text-muted-foreground hover:text-primary transition-colors">
                    Business
                  </Link>
                  <Link to="/calculators/construction" className="block text-muted-foreground hover:text-primary transition-colors">
                    Construction
                  </Link>
                </div>
              </div>
              <Link to="/blog" className="text-lg font-medium">
                Blog
              </Link>
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
