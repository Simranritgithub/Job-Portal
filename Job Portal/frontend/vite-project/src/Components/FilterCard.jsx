import React, { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Label } from './ui/Label';
import { useDispatch } from 'react-redux';
import { setLocation, settitle, setSalary } from './redux/filterSlice.js';

const filterData = [
  {
    filterType: "Location",
    array: ["New Delhi","Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
   array: [
  { label: "0-40k", min: 0, max: 40000 },
  { label: "40k-50k", min: 40000, max: 50000 },
  { label: "50k-1 lakh", min: 50000, max: 100000 },
  { label: "1 lakh+", min: 100000, max: Infinity }
]

  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  // ✅ Move state inside component
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Industry: "",
    Salary: ""
  });

  const handleFilterChange = (filterType, value) => {
  const currentValue = selectedFilters[filterType];
  const newValue = currentValue === value ? "" : value; // toggle

  setSelectedFilters(prev => ({ ...prev, [filterType]: newValue }));

  if (filterType === "Location") {
    dispatch(setLocation(newValue));
  } else if (filterType === "Industry") {
    dispatch(settitle(newValue));
  } else if (filterType === "Salary") {
    // ✅ Find the object by label
    const salaryObj = filterData
      .find((f) => f.filterType === "Salary")
      .array.find((item) => item.label === value);

    if (!newValue) {
      dispatch(setSalary({ min: 0, max: Infinity }));
    } else {
      dispatch(setSalary(salaryObj)); // ✅ send min, max object
    }
  }
};


  const handleClearAll = () => {
    setSelectedFilters({ Location: "", Industry: "", Salary: "" });
    dispatch(setLocation(""));
    dispatch(settitle(""));
    dispatch(setSalary(""));
  };

  return (
    <div className="p-4 w-full border rounded-md shadow min-h-screen bg-black">
      <h1 className="text-lg font-bold mb-3 text-red-600 mt-8">Filter Jobs</h1>
      <hr className="mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold mb-2 text-red-600">{data.filterType}</h2>

          <RadioGroup.Root
            className="space-y-2 text-white "
            value={selectedFilters[data.filterType] || undefined} // ✅ controlled
            onValueChange={(value) => handleFilterChange(data.filterType, value)}
          >
            {data.array.map((item, i) => {
  const label = typeof item === "string" ? item : item.label; // ✅ handle both string & object
  const itemId = `${data.filterType}-${label}`;

  return (
    <div key={i} className="flex items-center space-x-2">
      <RadioGroup.Item
  value={label}
  id={itemId}
  className={`
    w-3 h-3 border border-red-600 rounded-full
    flex items-center justify-center
    data-[state=checked]:bg-red-600
    data-[state=unchecked]:bg-transparent
  `}
/>

      <Label htmlFor={itemId}>{label}</Label>
    </div>
  );
})}
          </RadioGroup.Root>
        </div>
      ))}

      <button
        className="mt-4 text-red-600 border border-red-600 px-3 py-1 rounded"
        onClick={handleClearAll}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterCard;
