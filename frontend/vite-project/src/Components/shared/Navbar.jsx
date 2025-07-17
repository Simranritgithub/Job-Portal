import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  
   const{user}=useSelector(store=>store.auth);

  return (
    <>
      {/* Fixed Navbar */}
      <div className='bg-white fixed top-0 w-full z-50 shadow-md'>
        <div className='flex items-center justify-between w-full px-6 max-w-screen-xl mx-auto py-3'>
          {/* Logo */}
          <div>
            <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
          </div>

          {/* Navigation Links */}
          <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-12'>
              { user && user.role === 'recruiter' ?(
                  <>
                  <li > <Link className='text-black font-bold'to="/admin/companies">Companies</Link></li>
              <li ><Link className='text-black font-bold'to="/admin/jobs">Jobs</Link></li>
                  </>

                ):(
                  <><li > <Link className='text-black font-bold'to="/">HOME</Link></li>
              <li ><Link className='text-black font-bold'to="/About">ABOUT</Link></li>
              <li ><Link className='text-black font-bold'to ="/Jobs">JOBS</Link></li>
              <li ><Link className='text-black font-bold'to ="/browse">BROWSER</Link> </li>
                  </>
                )
                }
              
            </ul>

            {/* User Authentication */}
            {!user ? (
              <div className='flex items-center gap-2'>
                <a href="/login"><Button className="text-[#F83008] font-bold">LOGIN</Button></a>
                <a href="/signup"><Button className="text-[#F83008] font-bold">SIGNUP</Button></a>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className='w-80'>
                  <div className="flex gap-4 items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>Simran Mernstack</h4>
                      <p className='text-sm text-red-500'>Hi! I am a Mernstack Developer.</p>
                    </div>
                  </div>

                  {/* Profile & Logout Options */}
                  <div className='flex flex-col my-2 text-gray-600'>{
                     user && user.role === 'student' && (
                       <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 className="w-5 h-5" />
                      <Button variant="link" className="text-gray-700 hover:text-gray-900"><Link to="/profile">View Profile</Link></Button>
                    </div>
                     )
                    }
                    
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut className="w-5 h-5" />
                      <Button variant="link" className="text-gray-700 hover:text-gray-900">LOGOUT</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      {/* Push content down so it's not hidden under navbar */}
      <div className="mt-14"></div>
    </>
  );
};

export default Navbar;
