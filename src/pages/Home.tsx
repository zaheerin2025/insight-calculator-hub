
import React from 'react';
import Layout from '@/components/layout/Layout';
import SEOMeta from '@/components/ui/seo-meta';
import { Link } from 'react-router-dom';

// Import the Index component which contains the main home page content
import Index from './Index';

const Home: React.FC = () => {
  return <Index />;
};

export default Home;
