import React from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText,setSelectedCategory } from './redux/filterSlice'; // import your action
import { useEffect } from 'react';



export const HeroSection = () => {
  const { searchText,selectedCategory } = useSelector((state) => state.filter); // get current search text from Redux
 
  const dispatch = useDispatch();
const handleSearchChange = (e) => {
  dispatch(setSearchText(e.target.value));
  //console.log("Search Text:", searchText);
};
useEffect(() => {
  console.log("Updated searchText:", searchText);
}, [searchText]);


  return (
    
    <div className='  text-centre'>
      <div className='flex flex-col gap-4 my-10'>
      <span className='  mx-auto px-4 py-2 rounded-full  text-[#f93636] font-bold'>DREAM JOB PORTAL</span>
      <h1 className=' mx-auto text-5xl font-bold text-white'>Search,Apply &<br/>Get Your <span className='text-red-600'>Dream Jobs</span></h1>
      <p className='mx-auto'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam enim reprehenderit rep.</p>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-2 rounded-full items-centre gap-2 mx-auto bg-slate-200'>
        <input type="text"
        placeholder='Find your Dream Jobs'
        className='outline-none border-none w-full rounded-2xl'
        value={searchText}
                // controlled input
    onChange={handleSearchChange}/>
        <Button className="rounded-r-full bg-red-600" ><Search className="h-5 w-5" /></Button>
      </div>
    </div></div>
  )
}
export default HeroSection;
