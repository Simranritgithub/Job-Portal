import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  const { searchText, company, location, title, Salary } = useSelector((state) => state.filter);

  // Filter jobs based on search text and optional filters
  const filteredJobs = allJobs.filter((job) => {
  const searchLower = searchText?.toLowerCase().trim();

  const matchesSearch =
    !searchLower ||
    job.title?.toLowerCase().includes(searchLower) ||
    job.company?.name?.toLowerCase().includes(searchLower) ||
    job.location?.toLowerCase().includes(searchLower);

  const matchesCompany = !company || job.company?.name?.toLowerCase().includes(company.toLowerCase());
  const matchesLocation = !location || job.location?.toLowerCase().includes(location.toLowerCase());
  const matchesTitle = !title || job.title?.toLowerCase().includes(title.toLowerCase());

  let matchesSalary = true;
  if (Salary && Salary.min != null && Salary.max != null) {
    matchesSalary = job.salary >= Salary.min && job.salary <= Salary.max;
  }

  return matchesSearch && matchesCompany && matchesLocation && matchesTitle && matchesSalary;
});


  return (
    <div>
      <Navbar />
      <div className="flex max-w-7xl mx-auto -mt-10   ">
        <div className="w-[20%]">
          <FilterCard />
        </div>

        {filteredJobs.length === 0 ? (
          <span className="text-slate-900 text-2xl font-bold flex justify-center items-center ml-80">
            No jobs found
          </span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-4">
            <div className="grid grid-cols-3 gap-4 ">
              {filteredJobs.map((job) => (
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
