import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
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
