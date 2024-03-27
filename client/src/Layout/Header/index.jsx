import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'
import logoText from '../../assets/images/logo-text.png'
import { Link } from 'react-router-dom';
import Search from '../Search';

export default function Header() {
  // const {isAuth, setIsAuth} = useState('false');

 
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
              <Link
                to='/signup'
                className='py-2 text-sm font-medium text-gray-800 hover:text-gray-600'>
                Sign up
              </Link>
              <span className='font-medium'>/</span>
              <Link
                to='/signin'
                className='py-2 text-sm font-medium text-gray-800 hover:text-gray-600'>
                Sign in
              </Link>
            </div>

        </div>
      </nav>
    </header>
  )
}
