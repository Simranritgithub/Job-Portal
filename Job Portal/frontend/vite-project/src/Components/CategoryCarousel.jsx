import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSelectedCategory,setSearchText } from "./redux/filterSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const categories = [
  "Frontend",
  "Backened",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];


export const CategoryCarousel = () => {
  // State to store selected category
  const {selectedCategory,searchText} = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Handle button click
  const handleOnClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setSearchText(cat));
   // console.log( "seacrhtext",searchText) // Clear search text when category is selected
    console.log("Selected Category:", cat);
    // You can also dispatch this to Redux or use it to filter jobs
  };
  useEffect(() => {
  console.log("Updated searchText:", searchText);
}, [searchText]);

  

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                variant={selectedCategory === cat ? "default" : "outline"} // highlight selected
                className="rounded-full transition-all"
                onClick={() => handleOnClick(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Show selected category below */}
      {selectedCategory && (
        <p className="text-center text-gray-400 mt-4">
          Selected Category:{" "}
          <span className="text-red-500 font-semibold">{selectedCategory}</span>
        </p>
      )}
    </div>
  );
};

export default CategoryCarousel;
