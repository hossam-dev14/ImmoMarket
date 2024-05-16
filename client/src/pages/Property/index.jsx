import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { SlHeart, SlLocationPin, SlNote, SlShare } from 'react-icons/sl';
import BeatLoader from 'react-spinners/BeatLoader';
import Map from '../../components/Map';
import ThreeDTour from '../../components/ThreeDTour';
import api from '../../utils/api';

// EmailJS To sendMail 
import emailjs from '@emailjs/browser';

export default function Property() {
  const {userInfo} = useSelector((state) => state.auth);
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const formRef = useRef()
  
  // EmailJS To sendMail 
  const serviceID = "service_q8tcpzy"
  const templateID = "template_qubcj94"
  const publicKey = "21vPKvxAk7DXkAJTf"

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      serviceID,
      templateID,
      formRef.current,{ publicKey: publicKey })
      .then(
        () => {
          toast.success("Email sent successfully!");
          console.log('Success!');
        },
        (error) => {
          toast.error("Failed to send email. Please try again.");
          console.log('Failed...', error.text);
        },
      );
    };
    
    // Handle Show More
    const handleToggleDesc = () => {
      setShowFullDesc(!showFullDesc);
    };
  
    const previewLength = 100;
    const descriptionPreview = property?.description.slice(0, previewLength);
    const isLongDescription = property?.description.length > previewLength;

  useEffect(() => {
    const getProperty = async () => {
      try {
        const res = await api.get(`/properties/${params.propertyId}`);
        setProperty(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProperty();
    
  }, [params.propertyId]);



  
  return (
    <Layout>
      <section className=" text-gray-600 body-font">
        <div className="container flex items-center justify-center flex-col w-full px-5 py-24 mx-auto min-h-[30vh]">
        {loading ? (
          <div className='h-3/4 w-screen text-center'>
            <BeatLoader
              color="#064862"
              size={30} 
              aria-label="Loading..."
              data-testid="loader"
            />
          </div>
        ) : property ? (
          <div className="lg:w-8/12 mx-auto">
            <div className="flex jaustify-between items-center w-full relative mb-4">
              <h1 className="text-3xl font-semibold text-gray-800">{property.title}</h1>
              <span className='hidden md:block bg-secondary text-sm px-3 py-2 ml-3 text-gray-50 rounded-md'>For {property.category.toUpperCase()}</span>
              {( userInfo?.data?._id == property?.ownerId?.id) ? (
                <div className="absolute top-0 right-0 flex gap-3">
                  <SlShare className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/>
                  <Link 
                    className="text-white bg-green-600 py-2 px-5 hover:bg-gray-500 rounded text-2xl"
                    to={`/edit-property/${property.id}`}
                  ><SlNote /></Link>
                </div>
                ) : (
                  <div className="absolute top-0 right-0 flex gap-3">
                    <SlHeart className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/>
                    <SlShare className='text-3xl font-bold cursor-pointer w-10 h-10 py-2 bg-gray-200 shadow-sm rounded-md hover:shadow-md hover:text-secondary'/>
                  </div>
                )}
            </div>
            <div className="h-96 my-2">
              <img 
                src={property.imageUrl} 
                alt="Property" 
                className="object-cover object-center h-full w-full rounded-md shadow-md"
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-2/3 sm:pr-4 sm:py-8 mt-4 sm:mt-0 border-b border-gray-200">
                {/* Address */}
                <div className="flex justify-between w-full mb-3">
                  <p className="text-lg mb-3 flex items-center gap-1">
                    <SlLocationPin /> {property.address}
                  </p>
                  {/* <p className="mb-3">{property.city} London</p> */}
                  <h3 className="text-gray-800 text-2xl"> ${property.price}</h3>
                </div>

                {/* Description */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-5">
                    Description
                  </h2>
                  <p>
                     {showFullDesc || !isLongDescription
                        ? property.description 
                        : `${descriptionPreview}...`}
                    </p>
                    {isLongDescription && (
                      <Link 
                        className="text-secondary inline-flex items-center" 
                        onClick={handleToggleDesc}
                      >
                        {showFullDesc ? 'Show Less' : 'Learn More'}
                      </Link>
                    )}
                </div>

                {/* Property Details */}
                <div className=" p-4 bg-slate-50 rounded-md shadow-md mb-7">
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-5">
                    Property Details
                  </h2>
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="flex flex-col mb-1">
                      <ul>
                        <li className='flex gap-3'><p>Property ID: </p><span>{property.id.slice(0, 6)}...</span></li>
                        <li className='flex gap-3'><p>Type: </p> <span>{property.listingType}</span></li>
                        <li className='flex gap-3'><p>Category: </p><span>{property.category}</span></li>
                        <li className='flex gap-3'><p>Price: </p><span>{property.price}$</span></li>
                      </ul>
                    </div>

                    <div className="flex flex-col">
                    <ul>
                      <li className='flex gap-3'><p>Bedrooms: </p><span>{property.bedrooms}</span></li>
                      <li className='flex gap-3'><p>Bathrooms: </p><span>{property.bathrooms}</span></li>
                      <li className='flex gap-3'><p>Furnished: </p><span>{property.furnished ? 'Yes' : 'No'}</span></li>
                      <li className='flex gap-3'><p>Parking: </p><span>{property.parking ? 'Yes' : 'No'}</span></li>
                    </ul>
                  </div>
                  </div>
                </div>
                              
                {/* Location */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <div className="flex justify-between w-full mb-7">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        Map Location
                      </h2>
                      <div className="">
                        <p className="text-lg flex items-center gap-1">
                          <SlLocationPin /> {property.address}
                        </p>
                      </div>
                  </div>
                  <article className="md:h-72 w-full h-56">
                    <Map /> 
                  </article>
                </div>

                {/* 3D Tour */}
                <div className='p-4 bg-slate-50 rounded-md shadow-md mb-7'>
                  <h2 className="title-font font-medium text-lg text-gray-900 mb-7">
                    3D Tour
                  </h2>
                  <article className="md:h-72 w-full h-56">
                    <ThreeDTour />
                  </article>
                </div>
              </div>

              {/* Send Message to the Property's Owner */}
              <div className="sm:w-1/3 text-center sm:pl-4 sm:py-8 sm:border-l border-gray-200 mt-4 ">
                <div className="w-24 h-24 rounded-full inline-flex items-center justify-center ">
                  <img src={property?.ownerId?.avatar} alt="Property" className="object-cover object-center h-full w-full rounded-full " />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-2 text-gray-900 text-lg">{property?.ownerId?.username}</h2>
                  <div className="w-12 h-1 bg-secondary rounded mt-1 mb-4"></div>

                  <form className='min-w-[85%]' ref={formRef} onSubmit={sendEmail}>
                    {/* from name */}
                    <div className="relative w-full mb-3">
                      <input 
                        type="text"
                        name='sender_name'
                        defaultValue={userInfo?.data?.username}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder='From name'
                        autoComplete='username'
                        required
                      />
                    </div>
                    {/* to name */}
                    <div className="relative w-full mb-3">
                      <input 
                        type="text"
                        name='receiver_name'
                        hidden
                        defaultValue={property?.ownerId?.username}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder='To name'
                        autoComplete='username'
                        required
                      />
                    </div>
                    {/* From Email*/}
                    <div className="relative w-full mb-3">
                      <input 
                        type="email"
                        name='sender_email'
                        defaultValue={userInfo?.data?.email}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder='From email'
                        autoComplete='email'
                        required
                      />
                    </div>
                    {/* To Email*/}
                    <div className="relative w-full mb-3">
                      <input 
                      type="email"
                      name='receiver_email'
                      defaultValue={property?.ownerId?.email}
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder='To email'
                      autoComplete='email'
                      required
                      />
                    </div>
                    {/* Phone */}
                    <div className="relative w-full mb-3">
                      <input
                        type="number"
                        name="phone"
                        defaultValue={userInfo?.data?.phone}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Phone"
                        autoComplete='phone'
                        required
                      />
                    </div>
                    {/* Message */}
                    <div className="relative w-full mb-3">
                      <textArea 
                        name="message"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full h-32"
                        placeholder="Message"
                        autoComplete='Message'
                        required
                      >{`I am interested in your property '${property?.title}'`}</textArea>
                    </div>
                    {/* Submit */}
                    <div className="text-center mt-3">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        { loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className='text-2xl text-center text-gray-400 font-bold'>
            Property not found
          </p>
        )}

        </div>
      </section>
    </Layout>
  )
}