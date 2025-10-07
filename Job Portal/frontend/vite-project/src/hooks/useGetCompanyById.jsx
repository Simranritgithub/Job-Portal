import { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setSingleCompany } from '@/Components/redux/CompanySlice';

const useGetCompanyByID = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{
          withCredentials:true
        });

        console.log("Fetched Company:", res.data.jobs);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Failed to fetch all jobs:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId,dispatch]);
};

export default useGetCompanyByID;
