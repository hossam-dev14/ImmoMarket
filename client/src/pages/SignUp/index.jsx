import React from 'react'
import { useState } from 'react';
import Layout from '../../Layout';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      });
      const data = await res.json();
      if(data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/signin')
    } catch(error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <main>
        <section className="w-full h-full">
          <div className="container mx-auto px-4 my-12 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full sm:w-2/3 md:max-w-96 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white  border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-secondary text-lg font-bold">
                        Sign Up
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
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
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
                          placeholder="Phone number"
                          style={{ transition: "all .15s ease" }}
                          id='phone'
                          onChange={handleChange}
                          autoComplete='numder'/>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          id='password'
                          onChange={handleChange}
                          autoComplete='new-password'/>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password" >
                          confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          id='confirmPassword'
                          onChange={handleChange}
                          autoComplete='new-password' />
                      </div>
                      {/* Error */}
                      <div className="">
                        {error && 
                          <p className="text-red-500 w-full bg-red p-2 rounded-md transition-all duration-500">
                            {error.message}
                          </p>
                        } 
                      </div>
                      <div className="text-center mt-10">
                        <button
                          disabled={loading}
                          className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }} >
                          { loading ? 'Loading...' : 'Sign Up'}
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-wrap mt-6">
                      <div className="w-1/2">
                      </div>
                      <div className="w-1/2 text-right">
                        <a
                          href="#"
                          onClick={e => e.preventDefault()}
                          className="text-blue-500 hover:text-blue-400">
                          <small>Have an account?</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
