
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  // Create breadcrumb items from pathname
  const generateBreadcrumbItems = () => {
    const breadcrumbs = [];
    let path = '';

    // Add Home
    breadcrumbs.push({
      label: 'Home',
      path: '/',
      isHome: true
    });

    // Process path segments
    pathSegments.forEach((segment, index) => {
      path += `/${segment}`;
      
      // Format segment label (convert kebab-case to Title Case)
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special case: if segment is a category name, add the word "Calculators"
      if (
        index === 1 && 
        ['finance', 'health', 'math', 'business', 'construction'].includes(segment)
      ) {
        label += ' Calculators';
      }
      
      breadcrumbs.push({
        label,
        path,
        isHome: false
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  return (
    <div className="container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === breadcrumbItems.length - 1 ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <BreadcrumbLink as={Link} to={item.path}>
                    {item.isHome ? <Home className="h-4 w-4" /> : item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
