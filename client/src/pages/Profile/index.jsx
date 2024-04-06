// import React from 'react'
import { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../store/user/apiSlice';
import {  setUserInfo } from '../../store/user/authSlice';

// define options for toast notifications
const options = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "bg-slate-100 text-secondary"
};

export default function Profile() {
  const [formData, setFormData] = useState({});
  const {userInfo} = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  

  // if (!userInfo) return toast.error('Not logged in!', options); 

  const togglePassword = () => setPasswordShown(!passwordShown);

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value
    })
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(formData).unwrap();
      dispatch(setUserInfo(res));
      toast.success(res.message, options);
      navigate('/');
    } catch(err) {
      toast.error(err.message, options);
    }
  };


  useEffect(() => {

    if(!userInfo) return navigate('/signin')
    console.log(userInfo)
    
  },[userInfo, navigate]);
  

  return (
    <Layout>
      <section className="w-full h-full">
        <div className="container mx-auto px-4 my-12 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-2/3 md:max-w-96 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white  border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-secondary text-lg font-bold">
                      Update profile
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-6 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmit}>
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
                        defaultValue={userInfo?.res?.data?.username}
                        id="username"
                        onChange={handleChange}
                        autoComplete='username'
                      />
                    </div>

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
                        defaultValue={userInfo?.res?.data?.email}
                        id="email"
                        onChange={handleChange}
                        autoComplete='email'
                      />
                    </div>
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
                        defaultValue={userInfo?.res?.data?.phone}
                        id='phone'
                        onChange={handleChange}
                        autoComplete='numder'/>
                    </div>

                    {/* <div className="relative w-full mb-3">
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
                    </div> */}

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
