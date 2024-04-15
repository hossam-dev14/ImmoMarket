import React, { useState, useEffect } from 'react';
import Layout from "../../Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
// import { AiFillPlusCircle } from 'react-icons/ai';

import { useParams } from 'react-router-dom';


export default function Property() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    const getProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProperty();
  }, [id]);
 
  return (
    <Layout>
      <div className="container mx-auto px-4 my-12">
        {loading ? (
          <p>Loading...</p>
        ) : property ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
            <p>{property.description}</p>
            <p>Address: {property.address}</p>
            <p>Price: {property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Parking: {property.parking ? 'Yes' : 'No'}</p>
            <img src={property.imageUrls[0]} alt="Property" className="w-full max-w-md my-4" />
          </div>
        ) : (
          <p>Property not found</p>
        )}
      </div>
    </Layout>
  )
}