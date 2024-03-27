// import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}



// Specify the expected type of the children prop
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// DefaultLayout.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.arrayOf([PropTypes.node]),
//   ]).isRequired,
// };

// node instead of Node