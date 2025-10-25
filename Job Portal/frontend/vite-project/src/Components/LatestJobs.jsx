import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);
  const { searchText, title, location, company, Salary, selectedCategory } =
    useSelector((state) => state.filter);
  // ✅ from Redux store
  const sortedJobs = [...allJobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log("Sorted Jobs:", sortedJobs);
  const filteredJobs = sortedJobs.filter((job) => {
  const search = searchText.toLowerCase();
  return (
    job.title?.toLowerCase().includes(search) ||
    job.jobtype?.toLowerCase().includes(search) ||
    job.company?.name?.toLowerCase().includes(search) ||
    job.description?.toLowerCase().includes(search)
  );
});

  console.log("LatestJobs rendered:", { searchText, selectedCategory });


  console.log("Filtered Jobs:", filteredJobs);

  console.log("Redux allJobs:", allJobs);

  return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-0 sm:my-20">
      <h1 className="text-base sm:text-4xl font-bold text-white">
        Latest & Top <span className="text-red-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 my-2 sm:my-5">
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
