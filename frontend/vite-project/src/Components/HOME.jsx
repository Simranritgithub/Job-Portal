import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import LatestJobCards from './LatestJobCards';
import UseGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HOME = () => {
  UseGetAllJobs(); // ✅ use the hook correctly, don't render it
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate( );
  useEffect(()=>{
    if(user?.role ==='recruiter'){
      navigate('/admin/companies');
    }
  },[]);
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <LatestJobCards/>
    </div>
  );
};

export default HOME;
