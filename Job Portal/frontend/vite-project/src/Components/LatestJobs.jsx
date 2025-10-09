import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";


const LatestJobs = () => {
  
  const { allJobs } = useSelector((state) => state.job);
    const {  searchText,company, location, title, Salary } = useSelector((state) => state.filter);
     // ✅ from Redux store
     const filteredJobs = allJobs.filter((job) => {
      console.log("Job location:", job.location);
console.log("Search text:", searchText);
console.log("Match:", job.location?.toLowerCase().includes(searchText.toLowerCase()));

      
 // Check shape of data
      const matchesSearch = job.title?.toLowerCase().includes(searchText.toLowerCase());
      const matchesCompany =  job.company?.name?.toLowerCase().includes(searchText.toLowerCase()) 
      

    const matchesLocation = job.location
  ?.toLowerCase()
  .trim()
  .includes(searchText.toLowerCase().trim());

      const matchesTitle =  job.title?.toLowerCase().includes(title.toLowerCase());
      let matchesSalary = true;
    if (Salary) {
       matchesSalary = job.salary >= Salary.min && job.salary <= Salary.max;
    }
  
      return (
  (matchesSearch || matchesCompany || matchesLocation) &&
  matchesTitle &&
  matchesSalary
);

    });

  console.log("Redux allJobs:", allJobs);
  

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold text-white">
        Latest & Top <span className="text-red-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
         {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 6).map((job) => {
            const companyName = job.company?.name || "Unknown Company";
            const location = job.location || "Unknown Location";
            const title = job.title || "No Title";


            return (
              <div key={job._id}>
                <LatestJobCards
                   
      company={companyName}
      location={location}
      title={title}
      salary={job.salary}
      jobType={job.jobType}
      positions={job.positions}
      job={job} 
      id={job._id}
                />
              </div>
            );
          })
        ) : (
          <span className="text-red-600 font-bold ">No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
