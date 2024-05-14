import React, { useState, useEffect, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import api from '../../utils/api';

export default function AddProperty() {
  const fileRef = useRef(null);
  const {userInfo, isLoading } = useSelector((state) => state.auth);
  const [imageForDisplay, setImageForDisplay] = useState(false);  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    listingType: 'apartments',
    category: 'rent',
    price: 70,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    imageUrl: null,
  });

  const handleChange = (e) => {
    const { name, checked, value, files } = e.target; // Changed 'file' to 'files' to correctly access the files property
    if (name === 'imageUrl') {
      setFormData({
        ...formData,
        [name]: files[0] // Changed 'file' to 'files[0]' to correctly access the first file in the array
      });
      setImageForDisplay(URL.createObjectURL(files[0]));
    }
    else {
      setFormData({
        ...formData,
        [name]: name === 'parking' || name === 'furnished' ? checked : value
      });
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
  
    try {
      // Validate that all required fields are provided
      if ( !formData.price || !formData.address || 
        !formData.description || !formData.title) {
        toast.error("Please fill in all required fields");
        return;
      }  
  
      const propertyData = {
        ...formData,
        imageUrl: formData.imageUrl,
        ownerId: userInfo.data._id
      };
  
      const res = await api.post('/properties/add', 
      propertyData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.accessToken}`
        }
      });
  
      toast.success(res?.data?.message);
      navigate('/my-listing');
    } catch(err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };


  return  (
    <Layout>
      <section className="w-full h-full">
        <div className="container flex content-center items-center justify-center mx-auto px-6 md:px-12 my-12 h-full">
          <div className="flex sm:w-full lg:max-w-5xl content-center items-center justify-center h-full">
            <div className="w-full px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
                      Add property
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-300" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-6 pt-0">
                  <form onSubmit={handleAddProperty}>
                    {/* Title */}
                    <div className="relative w-full mb-5">
                      <label
                        className="block text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Title
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={formData.title}
                        />
                    </div>
                    {/* description */}
                    <div className="relative w-full mb-5">
                      <label
                        className="block text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Description
                      </label>
                        <textarea 
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        rows="7"
                        name="description" 
                        placeholder="Description"
                        onChange={handleChange}
                        value={formData.description} 
                        ></textarea>
                    </div>
                    {/* Address */}
                    <div className="relative w-full mb-5">
                      <label
                        className="block text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Address
                      </label>
                      <input 
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        value={formData.address}
                        />
                    </div>
                    {/* Image upload */}
                    <div className="relative w-full mb-5">
                      <div>
                        <label
                          className="block text-gray-700 text-xs font-bold mb-2"
                          htmlFor="images">
                          Upload Image
                        </label>
                        <input
                          hidden
                          type="file"
                          ref={fileRef}
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 "
                          name="imageUrl"
                          onChange={handleChange}
                        />
                        <div className='w-full h-64 md:80 lg:h-96 rounded-md shadow-md bg-gray-100 flex justify-center items-center flex-col'>
                          <div 
                              onClick={()=> fileRef.current.click()}
                              className="w-full h-full p-1 flex justify-center items-center 
                                rounded text-sm shadow  transition duration-150 ease-in-out cursor-pointer
                                 hover:border-2 border-gray-300">
                              {!imageForDisplay ? (
                                <AiOutlineCloudUpload 
                                  color="#4a859d"
                                  size={70} 
                                  aria-label="Loading..."
                                  data-testid="loader"
                                />
                              ) : (
                              <img
                                src={imageForDisplay}
                                alt="Selected"
                                onClick={()=> fileRef.current.click()}
                                className="w-full h-full rounded-md"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ListingType (houses, apartments, offices) */}
                    <div className="relative w-full mb-5">
                      <label
                        className="block text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Type
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="listingType"
                        onChange={handleChange}
                        value={formData.listingType}>
                        <option value="houses">Houses</option>
                        <option value="apartments">Apartments</option>
                        <option value="offices">Offices</option>
                      </select>
                    </div>
                    {/* Category (rent, sale) */} 
                    <div className="relative w-full mb-5">
                      <label
                        className="block text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Category
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                        name="category"
                        onChange={handleChange}
                        value={formData.category}>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                      </select>
                    </div>
                    <div className='flex flex-wrap w-full mb-5 justify-between gap-x-5'>
                      {/* Price */}
                      <div className="w-full sm:w-28 mb-5 ">
                        <label
                          className="block text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password">
                          Price
                        </label>
                        <input 
                          type="number"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring  w-full transition duration-150 ease-in-out"
                          name="price"
                          min='70'
                          max='10000000'
                          value={formData.price}
                          onChange={handleChange}/>
                      </div>
                      
                      {/* Bedrooms */}
                      <div className="w-full sm:w-28 mb-5">
                        <label
                          className="block text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password">
                          Bedrooms
                        </label>
                        <input 
                          type="number"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                          name="bedrooms"
                          min='1'
                          max='10'
                          value={formData.bedrooms}
                          onChange={handleChange}/>
                      </div>

                      {/* bathrooms */}
                      <div className="w-full sm:w-28 mb-5 ">
                        <label
                          className="block text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password">
                          Bathrooms
                        </label>
                        <input 
                          type="number"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full transition duration-150 ease-in-out"
                          name="bathrooms"
                          min='1'
                          max='10'
                          value={formData.bathrooms}
                          onChange={handleChange}/>
                      </div>
                    </div>
                    <div className='flex flex-wrap w-full mb-5 gap-x-8'>
                      {/* furnished */}
                      <div className="relative mb-5 flex gap-3">
                        <label
                            className="block text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Furnished
                          </label>
                        <input
                          type='checkbox'
                          className='w-[1rem] h-[1rem] border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring transition duration-150 ease-in-out'
                          name='furnished'
                          onChange={handleChange}
                          checked={formData.furnished}
                          />
                      </div>

                      {/* parking */}
                      <div className="relative mb-5 flex gap-3">
                        <label
                            className="block text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Parking
                          </label>
                        <input
                          type='checkbox'
                          className='w-[1rem] h-[1rem] border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring transition duration-150 ease-in-out'
                          name='parking'
                          onChange={handleChange}
                          checked={formData.parking}
                          />
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <button
                        disabled={isLoading}
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full transition duration-150 ease-in-out"
                        type="submit">
                          { isLoading ? 'Loading...' : 'Add property'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
