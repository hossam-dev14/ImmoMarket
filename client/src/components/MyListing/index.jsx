import React, { useEffect, useState } from 'react'
import TableData from '../TableData';
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const MyListing = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    const getMyListing = async () => {
      try {
        const token = userInfo.accessToken;
        const res = await api.get('/properties',{
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
  }, [userInfo.accessToken]);


  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = userInfo.accessToken;
      await api.delete(`/properties/delete/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted property from the state
      setProperties(properties.filter((property) => property.id !== propertyId));
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="lg:w-11/12 w-full mx-auto overflow-auto">
      { loading ? 
            (<div className='flex items-center  justify-center text-center h-64 min-w-[45vh]'>
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
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-x-2 ">Listing Title</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-r-2 ">Date published</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-r-2 ">Category</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-r-2 ">Listing Type</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-r-2 ">Price</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 border-r-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
          
             { properties.map((prop, i) => (
                <TableData propsTable={prop} key={i} onDelete={handleDeleteProperty} />
              ))}

          </tbody>
        </table>
        ) : ( 
          <div className='w-full h-32 m-auto '>
            <p className='text-3xl text-gray-400 font-samibold mb-7'>No Listing to Show!</p>
            <Link to='/add-property' className='py-2 px-3 bg-secondary text-gray-200 rounded-md hover:bg-gray-600 hover:shadow-md'>Create Listing</Link>
          </div>
        )}
      </div>

      <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
        {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button> */}
      </div>
    </div>
  )
}

export default MyListing;