import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSignOutUserMutation} from '../../store/user/apiSlice';
import { signOut } from '../../store/user/authSlice';
import { SlLayers, SlPlus, SlEnvolope, SlHome, 
  SlHeart, SlLogout, SlUser, SlBubble } from "react-icons/sl";
import SidebarToggle from '../../components/SidebarToggle';

const menuItems = {
  // Main
  main: [
    { name: "Dashboard", icon: <SlLayers/>, link: "/dashboard" },
    { name: "Add Property", icon: <SlPlus/>, link: "/add-property" },
    { name: "Message", icon: <SlEnvolope/>, link: "/dashboard" }
  ],
  // Manage Listing
  manageListing: [
    { name: "My Properties", icon: <SlHome/>, link: "/my-listing" },
    { name: "My Favorites", icon: <SlHeart/>, link: "/dashboard" },
    { name: "Reviews", icon: <SlBubble/>, link: "/dashboard" }
  ],
  // manageAccount: [
  //   { name: "Profile", icon: <SlUser/>, link: "/profile" },
  //   { name: "Signout", icon: <SlLogout/>, link: "/dashboard" }
  // ]
}

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const {userInfo} = useSelector((state) => state.auth);
  const [signOutUser, { isError }] = useSignOutUserMutation();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {setShowSidebar(!showSidebar)};


  const handleItemClick = (item) => {setSelectedItem(item)};

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
    <div className="bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`w-64 bg-slate-100 shadow-lg fixed left-0 top-0 h-full ease-in duration-300 z-50 overflow-y-auto
          ${showSidebar ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0`}>
        {/* Logo */}
        <Link to='/' className="flex p-3 title-font h-26 font-medium items-center flex-col justify-center text-gray-900 border-b border-gray-200 mb-7">
          <div className='w-14 pr-2'>
            <img className='rounded-md w-full h-8' 
              src={logo} alt='Logo' 
            />
          </div>
          <span className="text-secondary text-2xl md:block">ImmoMarket</span>
        </Link>

        {/* Main */}
        <div>
          <span className='text-gray-600 text-sm p-4 py-2'>Main</span>
          <nav className="mt-2">
            <ul>
              {menuItems.main.map((item, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200">
                  <Link to={item.link} className={`flex items-center gap-3 ${
                    selectedItem === item ? "text-lime-500" : "hover:text-gray"}`}
                  ><i>{item.icon}</i> {item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Manage Listing */}
        <div className='mt-5'>
          <span className='text-gray-600 text-sm p-4 py-2'>Manage Listing</span>
          <nav className="mt-2">
            <ul>
              {menuItems.manageListing.map((item, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200">
                  <Link to={item.link} className={`flex items-center gap-3 ${
                    selectedItem === item ? "text-lime-500" : "hover:text-gray"}`}>
                    <i>{item.icon}</i> 
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Manage Account */}
        <div className="w-full mb-5">
          <span className='text-gray-600 text-sm p-4 py-2'>Manage Account</span>
          <nav className="mt-2">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/profile" className="flex items-center gap-3"
                ><i><SlUser/></i> Profile</Link>
              </li>
              
              <li className="px-4 py-2 hover:bg-gray-200">
                <button className="flex items-center gap-3 hover:text-secondary" 
                  onClick={handleSignOut}>
                  <i><SlLogout/></i> 
                  Signout
                  </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>



      {/* Content */}

      <SidebarToggle showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

      {/* Footer */}
      {/* <footer className='lg:pl-64'>
        <div className="bg-gray-100 w-full">
          <div className="container py-4 px-5 mx-auto flex justify-between items-center sm:flex-row flex-col">
            <p className="text-sm text-gray-500 ">© {new Date().getFullYear()}{" "} ImmoMarket by
              <a href="https://hossam-dev14.github.io/" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Hossam Dev</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 justify-center sm:justify-start">
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
      </footer> */}
    </div>
  );
};

export default Sidebar;
