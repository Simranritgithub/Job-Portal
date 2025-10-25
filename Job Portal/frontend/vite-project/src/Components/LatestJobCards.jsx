import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const LatestJobCards = ({ company, location, title, salary, jobType, positions,id }) => {
  const navigate = useNavigate()
  
  // Fallbacks to prevent rendering issues
  if (!company || !title || !location) return null;

  return (
    <div className=" p-2 sm:p-6 rounded-xl shadow-lg border border-gray-700 text-white bg-[#111827]">
      <h3 className="  text-base sm:text-xl font-semibold">{company}</h3>
      <p className="text-gray-400">{location}</p>
      <h4 className="mt-2 text-base sm:text-lg font-medium">{title}</h4>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-white font-bold" variant="ghost">
          {positions || "1"} Position{positions > 1 ? "s" : ""}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {jobType || "Full Time"}
        </Badge>
        <Badge className="text-white font-bold" variant="ghost">
          {salary ? `${salary} LPA`:"Salary not disclosed"}
        </Badge>
      </div>

      <Button className="h-10 mt-4 bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition "onClick={() => navigate(`/description/${id}`)}>
        Apply Now
      </Button>
    </div>
  );
};

export default LatestJobCards;
