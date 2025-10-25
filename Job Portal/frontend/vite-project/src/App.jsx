import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Navbar from './Components/shared/Navbar';
import Login from './Components/auth/Login';
import Signup from './Components/auth/Signup';
import HOME from './Components/HOME';
import Jobs from './Components/Jobs';
import Browse from './Components/Browse';
import Profile from './Components/Profile';
import About from './Components/About';
import JobDescription from './Components/JobDescription'
import Companies from './Components/Admin/Companies';
import CreateCompany from './Components/Admin/CreateCompany';
import CompanySetup from './Components/Admin/CompanySetup';
import Adminjobs from './Components/Admin/Adminjobs';
import CreateAdminJob from './Components/Admin/CreateAdminJob';
import Applicants from './Components/Admin/Applicants';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<HOME/>
  },
 
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/about',
    element:<About/>
  },
  // FOR ADMIN
  {
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    
    path:'/admin/companies/create',
    element:<CreateCompany/>
  },
  {
    
    path:'/admin/companies/:companyId',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs',
    element:<Adminjobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<CreateAdminJob/>
  },
  {
    path:"/admin/jobs/:jobId/applicants",
    element:<Applicants/>
  }
],
)


export default appRouter;