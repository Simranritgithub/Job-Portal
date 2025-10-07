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
  const {searchText} =useSelector(store =>store.filter)
  const navigate = useNavigate();
  return (
    <div>
      
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit"  value={searchText} onChange ={(e)=>dispatch(setSearchText(e.target.value))}placeholder="Filter by name" />
          <Button onClick ={() => navigate("/admin/jobs/create")}>NEW JOBS</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

  

export default Adminjobs