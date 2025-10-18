import React, { useEffect, useState } from 'react';
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/Table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetallAdminjobs from '@/hooks/useGetallAdminjobs';
import { Eye } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';

const AdminJobsTable = () => {
  useGetallAdminjobs();
  const navigate = useNavigate();
  const { allJobs = [] } = useSelector(store => store.job || {});
  const { searchText } = useSelector(state => state.filter);

  const [companyMap, setCompanyMap] = useState({});

  const sortedJobs = [...allJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredJobs = searchText
    ? sortedJobs.filter((job) => {
        const companyName = companyMap[job.company] || '';
        return (
          companyName.toLowerCase().includes(searchText.toLowerCase()) ||
          job.title?.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    : sortedJobs;

  useEffect(() => {
    const fetchCompanies = async () => {
      const newMap = {};
      await Promise.all(
        allJobs.map(async (job) => {
          if (job.company && !companyMap[job.company]) {
            try {
              const res = await axios.get(`${COMPANY_API_END_POINT}/get/${job.company}`, { withCredentials: true });
              newMap[job.company] = res.data.company.name;
            } catch (error) {
              console.error('Failed to fetch company:', error);
            }
          }
        })
      );
      setCompanyMap(prev => ({ ...prev, ...newMap }));
    };

    if (allJobs.length > 0) fetchCompanies();
  }, [allJobs]);

  return (
    <div className='bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8 min-h-screen'>
      <div className='max-w-7xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-x-auto'>
        <Table>
          <TableCaption className="text-2xl font-bold text-red-600 text-center py-4">
            Your Recently Posted Jobs
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-900 text-white">
              <TableHead className="px-6 py-3 text-left text-red-600 text-xl font-bold tracking-tighter">COMPANY NAME</TableHead>
              <TableHead className="px-6 py-3 text-left text-red-600 text-xl font-bold tracking-tighter">ROLE</TableHead>
              <TableHead className="px-6 py-3 text-left text-red-600 text-xl font-bold tracking-tighter">DATE</TableHead>
              <TableHead className="px-6 py-3 text-left text-red-600 text-xl font-bold tracking-tighter">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-300">
                  No jobs posted yet.
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id} className="hover:bg-gray-700 transition-colors">
                  <TableCell className="px-6 py-4  text-lg font-semibold text-white">{companyMap[job.company] || 'Loading...'}</TableCell>
                  <TableCell className="px-6 py-4 font-medium text-lg text-gray-200">{job.title}</TableCell>
                  <TableCell className="px-6 py-4 font-medium text-lg text-gray-200">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="px-6 py-4 flex flex-row  gap-3 items-center">
                    <button
                      onClick={() => navigate(`/admin/job/setup`)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-2xl text-base font-semibold hover:bg-white hover:text-red-600 transition-colors"
                    >
                      Edit
                    </button>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-1 text-gray-200 cursor-pointer hover:text-red-500 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className='text-lg font-semibold'>Applicants</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;
