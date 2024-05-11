// import React, { useState } from 'react'
import { SlMenu  } from "react-icons/sl";
import PropTypes from 'prop-types'; // Import PropTypes

function SidebarToggle({showSidebar, toggleSidebar}) {

  return (
    <div className='lg:hidden fixed top-4 left-4 z-20'>       
      {/* Toggle Button */}
      <button className="bg-white p-3 rounded-lg shadow text-left"
        onClick={toggleSidebar}>
        <div className="text-xl font-medium flex items-center gap-3 ">
          <SlMenu className='font-bold' /> 
          {/* <h3>Dashboard Navigation</h3> */}
        </div>
      </button>

      <span className={`cursor-pointer bg-black h-full w-full fixed top-0 left-0 z-10 opacity-50
        ${showSidebar ? 'block' : 'hidden'}`} onClick={toggleSidebar}>
      </span>
    </div>
  )
}

SidebarToggle.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarToggle;

