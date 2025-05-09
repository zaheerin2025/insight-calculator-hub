
import React from 'react';
import Layout from '@/components/layout/Layout';
import PasswordGenerator from '@/components/calculators/utility/PasswordGenerator';
import SEOMeta from '@/components/ui/seo-meta';

const PasswordGeneratorPage: React.FC = () => {
  return (
    <Layout>
      <SEOMeta 
        title="Password Generator | Calculators Hub" 
        description="Create strong, secure passwords with customizable options for length and character types with our free online password generator."
        canonicalUrl="https://calculators-hub.com/calculators/utility/password-generator"
      />
      <PasswordGenerator />
    </Layout>
  );
};

export default PasswordGeneratorPage;
