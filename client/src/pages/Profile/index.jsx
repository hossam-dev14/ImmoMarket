import React from 'react'
import { useEffect, useState, useRef } from 'react';
import Layout from "../../Layout/DashLayout";
import { Link, useNavigate 
} from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../store/user/apiSlice';
import { setUserInfo } from '../../store/user/authSlice';
// import { legacy_createStore } from '@reduxjs/toolkit';


export default function Profile() {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const {userInfo} = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageForDisplay, setImageForDisplay] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const togglePassword = () => setPasswordShown(!passwordShown);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  if (!userInfo) return toast.error('Not logged in!'); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setImageForDisplay(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData, 
        [name]: value
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(formData).unwrap();
      dispatch(setUserInfo(res));
      // navigate('/my-listing');
      toast.success(res.message);
    } catch(err) {
      toast.error(err?.data?.error?.message);
    }
  };

  // useEffect(() => {
  //   if(!userInfo) return navigate('/signin');
  // },[userInfo, navigate]);
  
  return (
    <Layout>
      <section className="w-full h-full">
        <div className="container mx-auto px-4 my-12 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-2/3 md:max-w-96 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white  border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
                      Update profile
                    </strong>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleUpdate}>
                    {/* Image */}
                    <div className="relative w-full mb-6 ">
                      <input 
                        type="file" 
                        hidden 
                        ref={fileRef} 
                        accept='image/*'
                        name='avatar'
                        onChange={handleChange}
                      />
                      <img 
                        src={!imageForDisplay ? (userInfo?.data?.avatar) : (imageForDisplay)} 
                        alt="Avatar" 
                        onClick={() => fileRef.current.click()}
                        className=' w-1/3 mx-auto cursor-pointer rounded-full hover:shadow-lg shadow-md hover:border-2 border-gray-300'
                      />
                    </div>
                    {/* Username */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Username"
                        style={{ transition: "all .15s ease" }}
                        defaultValue={userInfo?.data?.username}
                        id="username"
                        onChange={handleChange}
                        autoComplete='username'
                      />
                    </div>
                    {/* Email */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Email"
                        defaultValue={userInfo?.data?.email}
                        id="email"
                        onChange={handleChange}
                        autoComplete='email'
                      />
                    </div>
                    {/* Phone number */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      >
                        phone number
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        style={{ transition: "all .15s ease" }}
                        placeholder="Phone number"
                        defaultValue={userInfo?.data?.phone}
                        id='phone'
                        onChange={handleChange}
                        autoComplete='numder'/>
                    </div>
                    {/* Current Password */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Current Password
                      </label>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Current Password"
                        style={{ transition: "all .15s ease" }}
                        id='currentPassword'
                        onChange={handleChange}
                        autoComplete='current-password'/>
                        <span
                          onClick={togglePassword}
                          className='text-gray-700 text-2xl absolute right-3 top-[53%] '>
                          {passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    {/* The new Password */}
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password" >
                        New Password
                      </label>
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="New Password"
                        style={{ transition: "all .15s ease" }}
                        id='newPassword'
                        onChange={handleChange}
                        autoComplete='new-password' />
                    </div>
                    {/* Submit button */}
                    <div className="text-center mt-10">
                      <button
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }} >
                        { isLoading ? 'Loading...' : 'Update'}
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
