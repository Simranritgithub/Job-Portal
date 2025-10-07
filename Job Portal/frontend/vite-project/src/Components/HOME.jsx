import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import LatestJobCards from './LatestJobCards';
import UseGetAllJobs from '@/hooks/UseGetAllJobs';

const HOME = () => {
  UseGetAllJobs(); // ✅ use the hook correctly, don't render it
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]
">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <LatestJobCards/>
    </div>
  );
};

export default HOME;
