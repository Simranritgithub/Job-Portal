import React from 'react'
import Navbar from '../shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setSearchText } from '../redux/filterSlice';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import useGetallAdminjobs from '@/hooks/useGetallAdminjobs';



const Adminjobs = () => {
  useGetallAdminjobs();
  const dispatch =useDispatch();
  const {searchText} =useSelector(state =>state.filter);
  const navigate = useNavigate();
  return (
    <div>
      
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] min-h-screen  '">
        <div className="flex items-center justify-between my-5">
          <Input className="w-full md:w-1/2 mx-10 mt-10 bg-gray-800 placeholder:text-base font-semibold text-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors "  value={searchText} onChange ={(e)=>dispatch(setSearchText(e.target.value))}placeholder="Filter by name" />
          <Button onClick ={() => navigate("/admin/jobs/create")} className="mt-10 mx-10 bg-red-600 text-white text-base font-semibold rounded-xl shadow-2xl border-2 border-white">NEW JOBS</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

  

export default Adminjobs;