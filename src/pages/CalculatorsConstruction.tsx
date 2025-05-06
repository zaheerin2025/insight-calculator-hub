
import React from 'react';
import CategoryLayout from '@/components/ui/category-layout';
import { Construction, Calculator } from 'lucide-react';

const calculators = [
  {
    title: 'Concrete Calculator',
    description: 'Calculate the amount of concrete needed for your construction project based on dimensions.',
    icon: <Construction className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/concrete-calculator',
    comingSoon: true
  },
  {
    title: 'Flooring Calculator',
    description: 'Calculate how much flooring material you need for your project based on room dimensions.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/flooring-calculator',
    comingSoon: true
  },
  {
    title: 'Paint Calculator',
    description: 'Calculate how much paint you need based on wall dimensions and paint coverage.',
    icon: <Construction className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/paint-calculator',
    comingSoon: true
  },
  {
    title: 'Roofing Calculator',
    description: 'Calculate roofing materials needed based on roof dimensions and type.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/roofing-calculator',
    comingSoon: true
  },
  {
    title: 'Tile Calculator',
    description: 'Calculate how many tiles you need for your project based on dimensions and tile size.',
    icon: <Construction className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/tile-calculator',
    comingSoon: true
  },
  {
    title: 'Wall Framing Calculator',
    description: 'Calculate lumber needed for wall framing based on wall dimensions and stud spacing.',
    icon: <Calculator className="h-6 w-6 text-primary" />,
    path: '/calculators/construction/wall-framing-calculator',
    comingSoon: true
  },
];

const CalculatorsConstruction: React.FC = () => {
  return (
    <CategoryLayout
      title="Construction Calculators"
      description="Access our collection of free construction calculators. Calculate concrete, flooring, paint, roofing materials and more for your projects."
      intro="Plan your construction projects better with our comprehensive suite of construction calculators. Estimate materials, costs, and dimensions for more efficient building."
      calculators={calculators}
      canonicalUrl="https://calculators-hub.com/calculators/construction"
    />
  );
};

export default CalculatorsConstruction;
