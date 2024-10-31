import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Page loading time here
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <BeatLoader
            color="#064862"
            size={20}
            aria-label="Loading..."
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

// Specify the expected type of the children prop
Layout.propTypes = {
  // children: PropTypes.node, // Requires a node to be passed as a child
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

export default Layout;
