import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const Navigate =useNavigate();
  const handleonLogout = async() => {
    try{
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if(response.data.success){
        toast.success(response.data.message);
        console.log("Logout successful");
        Navigate("/login");
      }

    }
    catch(error){
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
    
  }

  return (
    <>
      {/* Fixed Navbar */}
      <div className='bg-white fixed top-0 w-full z-50 shadow-md'>
        <div className='flex flex-col sm:flex-row items-center justify-between w-full px-4 sm:px-6 max-w-screen-xl mx-auto py-0 sm:py-3 gap-2 sm:gap-0'>
          
          {/* Logo */}
          <div>
            <h1 className='text-2xl font-bold text-center sm:text-left xs:text-lg sm:text-2xl'>
              Job<span className='text-[#F83002]'>Portal</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-12 w-full sm:w-auto'>
            <ul className='flex flex-col sm:flex-row font-medium items-center gap-2 sm:gap-12 text-center sm:text-left xs:text-sm sm:text-xl'>
              {user && user.role === 'recruiter' ? (
                <>
                  <li><Link className='text-black font-bold' to="/admin/companies">Companies</Link></li>
                  <li><Link className='text-black font-bold' to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link className='text-black font-bold' to="/">HOME</Link></li>
                  <li><Link className='text-black font-bold' to="/About">ABOUT</Link></li>
                  <li><Link className='text-black font-bold' to="/Jobs">JOBS</Link></li>
                  <li><Link className='text-black font-bold' to="/browse">BROWSER</Link></li>
                </>
              )}
            </ul>

            {/* User Authentication */}
            {!user ? (
              <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-2 mt-2 sm:mt-0'>
                <a href="/login"><Button className="text-[#F83008] font-bold w-full sm:w-auto">LOGIN</Button></a>
                <a href="/signup"><Button className="text-[#F83008] font-bold w-full sm:w-auto">SIGNUP</Button></a>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer mt-2 sm:mt-0">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className='w-64 sm:w-80'>
                  <div className="flex gap-4 items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className='font-medium text-sm sm:text-base'>Simran Mernstack</h4>
                      <p className='text-xs sm:text-sm text-red-500'>Hi! I am a Mernstack Developer.</p>
                    </div>
                  </div>

                  {/* Profile & Logout Options */}
                  <div className='flex flex-col my-2 text-gray-600 text-sm sm:text-base'>
                    {user && user.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 className="w-5 h-5" />
                        <Button variant="link" className="text-gray-700 hover:text-gray-900">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut className="w-5 h-5" />
                      <Button variant="link" className="text-gray-700 hover:text-gray-900" onClick={handleonLogout}>LOGOUT</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Push content down so it's not hidden under navbar */}
      <div className="mt-20 sm:mt-14"></div>
    </>
  );
};

export default Navbar;
