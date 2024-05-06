import React, { useState, useEffect } from 'react';
import Layout from "../../Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
// import { AiFillPlusCircle } from 'react-icons/ai';
import PropertyCard from '../../components/PropertyCard';
import BeatLoader from 'react-spinners/BeatLoader';


export default function Properties() {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await axios.get('/api/properties/all?search');
        setProperties(res.data);
        setLoading(false);        
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <strong className="text-secondary sm:text-4xl text-3xl font-medium title-font mb-2">
              Properties
            </strong>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Find your house dream!</p>
          </div>
          { loading ? 
          (<div className='flex items-center justify-center text-center h-3/4 w-screen'>
            <BeatLoader
              color="#064862"
              size={30} 
              aria-label="Loading..."
              data-testid="loader"
            />
          </div>
          ) : properties ? (
            <div>
              <div className="flex flex-wrap justify-center gap-4 -m-4">
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