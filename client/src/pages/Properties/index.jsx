import React, { useState, useEffect } from 'react';
import Layout from "../../Layout";
import { toast } from 'react-toastify';
// import { AiFillPlusCircle } from 'react-icons/ai';
import PropertyCard from '../../components/PropertyCard';
import BeatLoader from 'react-spinners/BeatLoader';
import Search from '../../components/Search';
import api from '../../utils/api';

export default function Properties() {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await api.get(`/properties/all`, {params: {search: searchTerm}});
        setProperties(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProperties();
  }, [searchTerm]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col items-center text-center w-full mb-20 bg-slate-300 pt-16 rounded-md shadow-lg">
            <strong className="text-secondary sm:text-4xl text-3xl font-medium title-font mb-2">
              Properties
            </strong>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Find your house dream!</p>
            {/* <Search /> */}
            <div className='w-4/5 max-w-[30rem] min-w-72 mt-8 mb-16'>
              <Search setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to the Search component */}
            </div>
          </div>
          
          { loading ? 
          (<div className='flex items-center justify-center text-center h-3/4 w-screen'>
            <BeatLoader
              color="#064862"
              size={20} 
              aria-label="Loading..."
              data-testid="loader"
            />
          </div>
          ) : properties ? (
            <div>
              <div className="flex flex-wrap justify-center gap-8">
                {properties.map((prop, i) => (
                  <PropertyCard propsCard={prop} key={i} />
                ))}
              </div>
            </div>
          ) : ( 
            <p className='text-2xl text-center text-gray-400 font-bold'>
              Properties not found
            </p>
          )}
        </div>
      </section>
    </Layout>
  )
}