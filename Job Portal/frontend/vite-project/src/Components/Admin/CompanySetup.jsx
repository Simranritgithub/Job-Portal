import React, { useState } from 'react'

import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import Navbar from '../shared/Navbar';
import { ArrowLeft } from 'lucide-react';

const CompanySetup = () => {
  const[input,setInput] = useState({
    name:"",
    description:"",
    website:"",
    location:"",
    file:null
  });
  const handleonChange =(e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  return (
    <div>
      <Navbar/>
      <div className='max-w-xl mx-auto my-10'>
      <form  action="" className='flex flex-col items-center gap-y-4' >
        <div className='flex items-center gap-5 p-8'>
          <Button variant ="outline" className='flex items-center gap-2 text-black-400 font-semibold'>
          <ArrowLeft/>
          <span>Back</span>
        </Button>
        <h1 className ="font-bold text-xl">Company Setup</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
        <Label className='flex flex-col  items-center justify-center  gap-y-40'> Company Name</Label>
        <Input className=' text-center' type="text" name="name" value={input.name} onChange={handleonChange} /></div>
      </form>
      </div>
    </div>
  )
}

export default CompanySetup