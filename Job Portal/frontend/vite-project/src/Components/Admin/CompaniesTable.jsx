import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { useDispatch } from 'react-redux';
//import { searchText } from './redux/filterSlice.js';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate() ;
  const {searchText}=useSelector((state)=>state.filter  )
  const filteredCompanies = companies.filter((company) =>
  company.name.toLowerCase().includes(searchText.toLowerCase())
);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true
        });
        const sortedCompanies = res.data.companies.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
        setCompanies(res.data.companies);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); 

  if (loading) return <p>Loading companies...</p>;
  if (companies.length === 0) return <p>No companies found.</p>;
 // navigate("/company-setup", { state: { companyId: company._id } });


  return (
    <div>
      <Table>
        <TableCaption>A list of your recently registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-red-600 text-lg font-semibold tracking-tighter">LOGO</TableHead>
            <TableHead className="text-red-600 text-lg font-semibold tracking-tighter">NAME</TableHead>
            <TableHead className="text-red-600 text-lg font-semibold tracking-tighter">DATE</TableHead>
            <TableHead className="text-red-600 text-lg font-semibold tracking-tighter">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                {company.logo !== "Not Provided" ? (
                  <img src={company.logo} alt={company.name} className="w-10 h-10 object-cover rounded-full" />
                ) : (
                  "No Logo"
                )}
              </TableCell>
              <TableCell className="text-gray-200 text-base font-medium tracking-tighter">{company.name}</TableCell>
              <TableCell className="text-gray-200 text-base font-medium tracking-tighter">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <button className="text-red-600 text-sm font-medium tracking-tighterhover:underline"onClick={ ()=>navigate(`${company._id}`)}>View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
