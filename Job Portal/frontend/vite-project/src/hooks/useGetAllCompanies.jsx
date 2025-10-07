import { useEffect } from 'react';
import { COMPANY_API_END_POINT} from '@/Components/utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setallcompanies } from '@/Components/redux/CompanySlice';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
           withCredentials:true
          }
        );

        console.log("Fetched Company:", res.data.companies);

        if (res.data.success) {
          dispatch(setallcompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Failed to fetch all jobs:", error);
      }
    };

    fetchAllCompany();
  }, []);
};

export default useGetAllCompanies;
