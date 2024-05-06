import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import Header from '../Header';
// import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { useSelector } from "react-redux";
import SidebarToggle from "../../components/SidebarToggle";

const Layout = ({ children }) => {
  const {userInfo} = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setIsLoggedIn(userInfo?.data !== null); // !data == true || data == false
    setShowSidebar(true);
  }, [userInfo]);
  
  return (
    <>
      <Header />
         {/* Main Content */}
        <main className="flex-grow overflow-auto lg:ml-64">
          {children}
        </main>
        {/* Conditional Sidebar */}
        {isLoggedIn && showSidebar && <Sidebar /> }

        {/* Footer (conditionally hidden on dashboard) */}
        {/* {!showSidebar &&  <Footer />} */}
    </>
  );
}

// Specify the expected type of the children prop
Layout.propTypes = {
  // children: PropTypes.node, // Requires a node to be passed as a child
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

export default Layout;
