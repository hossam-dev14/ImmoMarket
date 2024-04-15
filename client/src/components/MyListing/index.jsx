import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
import TableData from '../TableData';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';

const MyListing = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userInfo} = useSelector((state) => state.auth);


  useEffect(() => {
    const getMyListing = async () => {
      try {
        const token = userInfo.accessToken;
        console.log(token);
        const res = await axios.get('http://localhost:8080/api/properties',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(res.data);
        setLoading(false);        
        
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getMyListing();
  }, []);

  return (
    <div>
      <div className="lg:w-4/5 w-full mx-auto overflow-auto">
      { loading ? 
            (<div className='flex items-center justify-center text-center h-64 min-w-[45vh]'>
              <BeatLoader
                color="#064862"
                size={20} 
                aria-label="Loading..."
                data-testid="loader"
              />
            </div>
            ) : properties ? (
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Listing Title</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date published</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Listing Type</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
          {/* { loading ? 
            (<div className='flex items-center justify-center text-center h-64 min-w-[45vh]'>
              <BeatLoader
                color="#064862"
                size={20} 
                aria-label="Loading..."
                data-testid="loader"
              />
            </div>
            ) : properties ? ( */}
             { properties.map((prop, i) => (
                <TableData propsTable={prop} key={i} />
              ))}
            {/* ) : ( 
              <p>Property not found</p>
            )} */}
          </tbody>
        </table>
        ) : ( 
          <p className='text-2xl text-gray-400 font-bold'>No Property Founded 404!</p>
        )}
      </div>

      <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
        {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button> */}
      </div>
    </div>
  )
}


export default MyListing;