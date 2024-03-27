import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto flex md:items-start lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col justify-between">
        <div className="w-72 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to='/' className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <div className='w-14 pr-2'>
              <img className='rounded-md w-full' 
                src={logo} 
                alt='immomarket' 
              />
            </div>
            <span className="text-secondary text-2xl">ImmoMarket</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
        </div>
        <div className=" flex flex-wrap sm:flex-nowrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">

          <div className="md:w-3/5 min-w-36 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Categories</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Agents</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About Us</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Blog</a>
              </li>
            </nav>
          </div>
          <div className="md:w-3/5 min-w-36 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">New Listing</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Buy Apartments</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Buy Houses</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Rent Houses</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Rent Office</a>
              </li>
            </nav>
          </div>
          <div className="md:w-3/5 min-w-36 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">New Listing</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Buy Apartments</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Buy Houses</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Rent Houses</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Rent Office</a>
              </li>
            </nav>
          </div>

        </div>
      </div>
      <div className="bg-gray-100">
      <div className="container py-4 px-5 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()}{" "} ImmoMarket by
          <a href="https://hossam-dev14.github.io/" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Hossam Dev</a>
        </p>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-secondary">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-secondary">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-secondary">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
        </span>
      </div>
      </div>
    </footer>
  )
}
