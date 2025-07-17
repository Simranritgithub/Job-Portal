import React from 'react';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from './ui/Label';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40-1 lakh", "1 lakh to 5 lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-4 w-full border rounded-md shadow bg-black">
      <h1 className="text-lg font-bold mb-3 text-red-600">Filter Jobs</h1>
      <hr className="mb-4" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold mb-2 text-red-600">{data.filterType}</h2>
          <RadioGroup className="space-y-2 text-white">
            {data.array.map((item, i) => {
              const itemId = `${data.filterType}-${item}`;
              return (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
