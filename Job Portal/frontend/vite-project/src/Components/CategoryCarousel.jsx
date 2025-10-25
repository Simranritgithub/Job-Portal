import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, setSearchText } from "./redux/filterSlice";

const categories = [
  "Frontend",
  "Backend",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

export const CategoryCarousel = () => {
  const { selectedCategory, searchText } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const handleOnClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setSearchText(cat));
    console.log("Selected Category:", cat);
  };

  useEffect(() => {
    console.log("Updated searchText:", searchText);
  }, [searchText]);

  return (
    <div className="px-4 sm:px-0">
      <Carousel className="w-full max-w-full sm:max-w-xl mx-auto my-4">
        <CarouselContent className="flex flex-nowrap gap-2 sm:gap-4">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full xs:basis-1/2 md:basis-1/2 lg:basis-1/3 p-1"
            >
              <Button
                variant={selectedCategory === cat ? "default" : "outline"}
                className=" w-4/1 flex justify-center items-center mx-auto sm:w-auto rounded-full text-sm xs:text-base transition-all"
                onClick={() => handleOnClick(cat)}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between mt-2 ">
          <CarouselPrevious className="ml-6 sm:ml-2" />
          <CarouselNext className="mr-6 sm:mr-2"/>
        </div>
      </Carousel>

      {selectedCategory && (
        <p className="text-center text-gray-400 mt-4 text-sm xs:text-base">
          Selected Category:{" "}
          <span className="text-red-500 font-semibold">{selectedCategory}</span>
        </p>
      )}
    </div>
  );
};

export default CategoryCarousel;
