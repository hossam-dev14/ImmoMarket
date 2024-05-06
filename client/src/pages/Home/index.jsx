import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from '../../Layout'
import Search from '../../components/Search';
import Hero from '../../components/Hero';

import { toast } from 'react-toastify';
import PropertyCard from '../../components/PropertyCard';
import BeatLoader from 'react-spinners/BeatLoader';


export default function Home() {
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
      <Hero />
      <section className='pt-6 px-4 md:px-10 pb-10'>
        <div className="container flex items-center justify-center flex-col w-full px-5 py-24 mx-auto min-h-[30vh]">
          
          {/* Propereties her */}
          { !properties ? (
            <div className='text-center h-3/4 w-screen'>
              <BeatLoader
                color="#064862"
                size={30} 
                aria-label="Loading..."
                data-testid="loader"
              />
            </div>
           ) : properties ? (
              <div>
              {/* Search: Buy/Rent , I'm looking to (buy Apartments), Location(Berlin, Germany), Price Range($10,0000-$200,000) */}
                {/* Top Properties */}
                {/* Explore the Neighborhoods */}
                {/* Recent Properties for Sold */}
                {/* Popular Cities */}
                {/* Buy, Rent & Sell */}
                {/* Why Choose Us */}
                {/* Meet Our Agents */}
                {/* Client Review */}
                
                <div className="flex flex-wrap justify-center gap-5 mt-8">
                  {properties.map((prop, i) => (
                    <PropertyCard propsCard={prop} key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <p className='text-2xl text-center text-gray-400 font-bold'>
                Property not found
              </p>
            )
          }
        </div> 
      </section>
    </Layout>
  )
}
