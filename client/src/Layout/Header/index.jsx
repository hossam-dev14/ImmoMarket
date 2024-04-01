import React from 'react';
import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSignOutUserMutation} from '../../store/user/apiSlice';
import { signOut } from '../../store/user/authSlice';
import Search from '../Search';

export default function Header() {
  const {userInfo} = useSelector((state) => state.auth);
  const [signOutUser, { isError }] = useSignOutUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignOut = async () => {
    try {
      await signOutUser().unwrap();
      dispatch(signOut());
      navigate('/');

      toast.success("Sign out successfully");
    } catch (error) {
      if (!isError) return;
      toast.error("Failed to sign out: ", error.data.message);
    }
  };
  
  return (
    <header className="text-gray-600 body-font">
      <nav className='bg-slate-100  shadow-md'>
        <div className='max-w-7xl mx-auto px-4 lg:px-10 flex justify-between py-3 items-center'>
          <Link to='/' className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className='w-14 pr-2'>
              <img className='rounded-md w-full' 
                src={logo} 
                alt='immomarket' 
              />
            </div>
            <span className="text-secondary text-2xl hidden md:block">ImmoMarket</span>
          </Link>

          {/* Serch bar */}
          <div className='min-w-[300px] hidden md:block'>
            <Search />
          </div>
           
          <div className='space-x-2'>
            { userInfo ? (
              <>
                <div className='flex items-center gap-4 text-gray-700 text-sm font-medium'>
                  <Link to='/profile'>
                    {/* {userInfo?.res.data.username} */}
                    <p>Profile</p>
                  </Link>
                  <button onClick={handleSignOut}>Sign out</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link
                    to='/signup'
                    className='py-2 text-sm font-medium text-gray-800 hover:text-gray-600'>
                    Sign up
                  </Link>
                  <span className='font-medium'> / </span>
                  <Link
                    to='/signin'
                    className='py-2 text-sm font-medium text-gray-800 hover:text-gray-600'>
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
