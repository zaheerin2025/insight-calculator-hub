
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Command as CommandPrimitive } from "cmdk";
import { Search as SearchIcon, Calculator, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { calculatorCategories } from "@/data/calculator-categories";

type Calculator = {
  name: string;
  path: string;
  comingSoon?: boolean;
  category?: string;
};

export function SearchDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Flatten all calculators from categories with their category info
  const allCalculators: Calculator[] = React.useMemo(() => {
    return calculatorCategories.flatMap((category) =>
      category.calculators.map((calc) => ({
        ...calc,
        category: category.title,
      }))
    );
  }, []);

  // Filter calculators based on search query
  const filteredCalculators = React.useMemo(() => {
    if (!searchQuery) return allCalculators;
    
    const query = searchQuery.toLowerCase();
    return allCalculators.filter(
      (calculator) =>
        calculator.name.toLowerCase().includes(query) ||
        (calculator.category && calculator.category.toLowerCase().includes(query))
    );
  }, [searchQuery, allCalculators]);

  // Handle calculator selection
  const handleSelectCalculator = (calculator: Calculator) => {
    if (!calculator.comingSoon) {
      setOpen(false);
      navigate(calculator.path);
    }
  };

  // Run the search when the dialog is opened
  React.useEffect(() => {
    if (!open) {
      // Reset search when dialog closes
      setTimeout(() => setSearchQuery(""), 300);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-white overflow-hidden max-w-2xl">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          shouldFilter={false}
        >
          <div className="flex items-center border-b px-3 h-12">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search calculators..."
              className="flex-1 h-11 outline-none bg-transparent"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-muted-foreground hover:text-foreground rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm">
              No calculators found.
            </CommandEmpty>
            {filteredCalculators.length > 0 && (
              <CommandGroup heading="Calculators">
                {filteredCalculators.map((calculator) => (
                  <CommandItem
                    key={calculator.path}
                    value={calculator.name}
                    onSelect={() => handleSelectCalculator(calculator)}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      calculator.comingSoon && "opacity-60"
                    )}
                    disabled={calculator.comingSoon}
                  >
                    <Calculator className="h-4 w-4 text-primary" />
                    <span>{calculator.name}</span>
                    {calculator.category && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {calculator.category}
                      </span>
                    )}
                    {calculator.comingSoon && (
                      <span className="ml-auto text-xs py-0.5 px-1.5 bg-muted rounded-full text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
