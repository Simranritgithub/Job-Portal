import React from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setSearchText } from '../redux/filterSlice.js';
import { useDispatch } from 'react-redux';

function Companies() {
  const navigate = useNavigate();
  
const dispatch = useDispatch();

  const{searchText}=useSelector((state)=>state.filter)
  const handleOnchange=(e)=>{
    dispatch(setSearchText(e.target.value))
  }
  // const filtercompanies=(e)=>{
  //   setSearchText(e.target.value)
  // }
  return (
    <div  >
  
  <Navbar  />

  
  <div className="mt-6 max-w-6xl mx-auto my-10 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-6 rounded-lg">
        <div className="flex items-center justify-between my-4">
          <Input className="w-fit bg-red-600 placeholder:text-gray-200 mt-10 mx-10" placeholder="Filter by name" value={searchText} onChange={handleOnchange}/>
          <Button onClick ={() => navigate("/admin/companies/create")} className="bg-red-600 mx-10 mt-10">New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
