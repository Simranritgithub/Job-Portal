import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs(); // Load jobs from backend

  const { allJobs } = useSelector((state) => state.job);

  return (
    <div>
      <Navbar />
      <div className='flex max-w-7xl mx-auto mt-4'>
        <div className='w-[20%]'>
          <FilterCard />
        </div>

        {allJobs.length <= 0 ? (
          <span className='text-white ml-4 mt-4'>No jobs found</span>
        ) : (
          <div className='flex-1 h-[88vh] overflow-y-auto pb-4'>
            <div className='grid grid-cols-3 gap-4'>
              {allJobs.map((job) => (
                <div key={job._id}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
