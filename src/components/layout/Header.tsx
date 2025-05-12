
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Calculator, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { SearchDialog } from '@/components/ui/search-dialog';
import { calculatorCategories, Calculator as CalculatorType } from '@/data/calculator-categories';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "w-full py-3 sticky top-0 z-50 transition-all duration-200", 
      isScrolled ? "bg-white/95 backdrop-blur-sm border-b shadow-sm" : "bg-white border-b"
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-10 w-10 transition-transform group-hover:scale-105 shadow-sm">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Calculators-Hub
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    isActive("/") && "bg-accent/50"
                )}>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  location.pathname.includes('/calculators') && "bg-accent/50"
                )}>
                  Calculators
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {calculatorCategories.map((category, index) => (
                        <Link 
                          key={index}
                          to={category.path}
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center ${category.background}`}>
                            {React.cloneElement(category.icon, { className: "h-5 w-5 text-white" })}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{category.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{category.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <Link 
                      to="/all-calculators"
                      className="flex items-center justify-center space-x-2 rounded-md p-3 bg-muted hover:bg-muted/70 transition-colors mt-4 font-medium"
                    >
                      View All Calculators
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    isActive("/blog") && "bg-accent/50"
                )}>
                  <Link to="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    isActive("/about") && "bg-accent/50"
                )}>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    isActive("/contact") && "bg-accent/50"
                )}>
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="h-9 w-9 rounded-full hover:bg-accent/80"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="h-9 w-9 rounded-full"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <div className="flex items-center mb-8 mt-4">
                <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-lg h-8 w-8 mr-2">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-primary">Calculators-Hub</span>
              </div>
              
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search calculators...
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-4">
                <Link to="/" className={cn(
                  "text-lg font-medium py-2",
                  isActive("/") && "text-primary"
                )}>
                  Home
                </Link>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Calculators</h3>
                    <Link to="/all-calculators" className="text-xs text-primary">View All</Link>
                  </div>
                  
                  <div className="space-y-6 mt-3">
                    {calculatorCategories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <Link 
                          to={category.path} 
                          className="flex items-center space-x-2 font-medium text-sm"
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${category.background}`}>
                            {React.cloneElement(category.icon, { className: "h-3 w-3 text-white" })}
                          </div>
                          <span>{category.title}</span>
                        </Link>
                        
                        <div className="ml-8 space-y-1">
                          {category.calculators.slice(0, 3).map((calculator: CalculatorType, calcIndex: number) => (
                            <Link 
                              key={calcIndex}
                              to={calculator.comingSoon ? "#" : calculator.path}
                              className={cn(
                                "block text-sm text-muted-foreground hover:text-foreground transition-colors"
                              )}
                            >
                              {calculator.name}
                              {calculator.comingSoon && " (Soon)"}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link to="/blog" className={cn(
                  "text-lg font-medium py-2",
                  isActive("/blog") && "text-primary"
                )}>
                  Blog
                </Link>
                
                <Link to="/about" className={cn(
                  "text-lg font-medium py-2",
                  isActive("/about") && "text-primary"
                )}>
                  About
                </Link>
                
                <Link to="/contact" className={cn(
                  "text-lg font-medium py-2",
                  isActive("/contact") && "text-primary"
                )}>
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} setOpen={setIsSearchOpen} />
    </header>
  );
};

export default Header;
