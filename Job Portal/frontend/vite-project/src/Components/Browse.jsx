import React from 'react';
import Navbar from './shared/Navbar';
import Jobs from './Jobs'; // ✅ Component

const Browse = () => {
  return (
    <div>
      
      <div className='max-w-7xl mx-auto  my-10'>
        <h1 className='font-bold text-xl text-slate-900  mt-16'>Search Results</h1>
        <Jobs  /> {/* ✅ Renders job list component */}
      </div>
    </div>
  );
};

export default Browse;
