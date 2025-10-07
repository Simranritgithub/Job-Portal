import React, { useState } from 'react'
import { Button } from '../ui/button'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/CompanySlice';
import axios from 'axios';
import {COMPANY_API_END_POINT} from "@/Components/utils/constant";
import { toast } from 'sonner';



const CreateCompany = () => {
  const navigate =useNavigate();
  const [companyName,setCompanyName] = useState("");

  const dispatch =useDispatch();
  const registerNewCompany = async()=>{

  try{
    console.log("📦 Company name being submitted:", companyName);

    const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
      headers:{
        'Content-Type':'application/json'},
        withCredentials:true
      
    });
    if(res?.data?.success){

       dispatch(setSingleCompany(res.data.company));
       console.log(res.data.message)
      toast.success(res.data.message);
      

      const companyId = res?.data?.company?._id;
      navigate(`/admin/companies/${companyId}`)
    }
  }
  catch(error){
    console.log(error);
  }
     
  }
  return (
    <div>
      <Navbar/>
      <div className ='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className ='font-bold text-2xl'>Simran PVT LTD..</h1>
          <p className='text-gray-600'> 
            This company aims to provide jobs to deserving candidates....
          </p>
        </div>
        <Label>
          COMPANY NAME
        </Label>
        <Input type="text" className ="my-2" placeholder ="Google,Microsoft etc" onChange={(e)=>setCompanyName(e.target.value)}/>
        <div className='flex items-center gap-2 my-10'>
          <Button variant ="outline "onClick={()=>navigate("/admin/companies")}>Cancel</Button>
          <Button onClick ={registerNewCompany}>Continue</Button>
        </div>
      </div>
      
    
    </div>
  )
}

export default CreateCompany