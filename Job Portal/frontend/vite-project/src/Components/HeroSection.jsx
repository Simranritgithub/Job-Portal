import React from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className='  text-centre'>
      <div className='flex flex-col gap-4 my-10'>
      <span className='  mx-auto px-4 py-2 rounded-full  text-[#f93636] font-bold'>DREAM JOB PORTAL</span>
      <h1 className=' mx-auto text-5xl font-bold text-white'>Search,Apply &<br/>Get Your <span className='text-red-600'>Dream Jobs</span></h1>
      <p className='mx-auto'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam enim reprehenderit rep.</p>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-2 rounded-full items-centre gap-2 mx-auto bg-slate-200'>
        <input type="text"
        placeholder='Find your Dream Jobs'
        className='outline-none border-none w-full rounded-2xl'/>
        <Button className="rounded-r-full bg-red-600"><Search className="h-5 w-5"/></Button>
      </div>
    </div></div>
  )
}
export default HeroSection;
