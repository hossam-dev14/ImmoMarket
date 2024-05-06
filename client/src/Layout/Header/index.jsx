// import React from 'react';
import logo from '/src/assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSignOutUserMutation} from '../../store/user/apiSlice';
import { signOut } from '../../store/user/authSlice';
import Search from '../../components/Search';
import SidebarToggle from '../../components/SidebarToggle';

export default function Header() {
  const {userInfo} = useSelector((state) => state.auth);
  const [signOutUser, { isError }] = useSignOutUserMutation();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignOut = async () => {
    try {
      await signOutUser().unwrap();
      dispatch(signOut());

      navigate('/signin');

      toast.success("Sign out successfully");
    } catch (error) {
      if (!isError) return;
      toast.error("Failed to sign out: ", error.message);
    }
  };

  
  return (
    <header className="text-gray-600 body-font ease-in duration-300 sticky top-0 right-0 left-0 z-10">
      <nav className='bg-slate-200 shadow-md'>
        <div className='max-w-7xl mx-auto px-4 lg:px-10 flex justify-between py-3 items-center h-20'>
          <Link to='/' className="flex h-14 title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className='w-14 pr-2'>
              <img className='rounded-md w-full' 
                src={logo} alt='immomarket' 
              />
            </div>
            <span className="text-secondary text-2xl hidden md:block">ImmoMarket</span>
          </Link>
        {userInfo?.data ? (
          <div />
          ) : (
            <Link to='/' className="flex h-14 title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <div className='w-14 pr-2'>
                <img className='rounded-md w-full' 
                  src={logo} alt='immomarket' 
                />
              </div>
              <span className="text-secondary text-2xl hidden md:block">ImmoMarket</span>
            </Link>
          )}

          

          {/* Serch bar */}
          {/* <div className='min-w-[200px] hidden md:block'>
            <Search />
          </div> */}

          <div className='flex justify-between items-center text-md font-medium text-gray-600 '>
            <div className='flex items-center py-2'>
              <Link to='/' className='ml-3 hover:text-gray-500'>
                Home
              </Link>
              <Link to='/properties' className='ml-3 hover:text-gray-500'>
              Properties
              </Link>
            </div>
            { userInfo?.data ? (
              <>
                <div className='flex items-center gap-4 '>
                  <Link to='/dashboard' className='ml-3 py-2 hover:text-gray-500'>
                    Dashboard
                  </Link>
                  <Link to="/profile" className='w-10 '>
                    <img src={userInfo?.data?.avatar} alt="profile" className='w-full rounded-full shadow-md'/>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className='py-2 ml-3'>
                  <Link
                    to='/signup'
                    className=' hover:text-gray-500'>
                    Sign up
                  </Link>
                  <span className='font-medium '> / </span>
                  <Link
                    to='/signin'
                    className=' hover:text-gray-500'>
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div> 
        </div>
      </nav>
    </header>
  )
}
