import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import bgImg from '/src/assets/images/bg.png'
import Search from '../../components/Search';
import PropertyCard from '../../components/PropertyCard';
import BeatLoader from 'react-spinners/BeatLoader';
import api from '../../utils/api';

export default function Home() {
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
        <div className={`w-full h-[90vh] flex justify-center items-center bg-center bg-cover bg-no-repeat bg-gray-100`} 
        style={{backgroundImage: `url(${bgImg})`}}>
          <div className="flex flex-col justify-center items-start py-4 mt-16 w-1/2">
            <div className="hero-title">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold lg:font-bold text-gray-200">
                Discover Most Suitable <br />
                Properties in One Place
              </h1>
            </div>
            {/* <Search /> */}
            <div className='w-full max-w-[43rem] min-w-60 mt-8 mb-16'>
              <Search setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to the Search component */}
            </div>
          </div>
        </div>

        <div className='pt- px-4 md:px-10 pb-10 '>
          <div className="container flex items-center justify-center flex-col w-full px-5 py-16 mx-auto min-h-[30vh]">
            {/* Propereties here */}
            {loading ? (
              <div className='text-center h-3/4 w-screen'>
                <BeatLoader
                  color="#064862"
                  size={20} 
                  aria-label="Loading..."
                  data-testid="loader"
                />
              </div>
            ) : properties && properties.length > 0 ? (

              <div className='w-full'>
                {/* Search: Buy/Rent , I'm looking to (buy Apartments), Location(Berlin, Germany), Price Range($10,0000-$200,000) */}
                {/* Top Properties */}
                {/* Recent Properties for Sold */}
                {/* Popular Cities */}
                {/* Buy, Rent & Sell */}
                {/* Why Choose Us */}
                {/* Meet Our Agents */}
                {/* Client Review */}

                <div className="flex flex-wrap justify-center gap-5 mt-8 -m-4">
                  {properties.map((prop, i) => (
                    <PropertyCard propsCard={prop} key={i} />
                  ))}
                </div>
              </div>
            ) : ( 
              <p className='text-2xl text-center text-gray-400 font-bold'>
                Property not found
              </p>
            )}
          </div> 
        </div>
      </section>
    </Layout>
  );
}
