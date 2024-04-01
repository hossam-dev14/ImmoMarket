// import React from 'react'
import Layout from '../../Layout'

export default function ErrorPage() {
  return (
    <Layout>
      <div className="mx-auto text-center relative">
        <h1 className="md:text-[17rem] sm:text-[14rem] font-semibold font-sans text-[9rem] text-[#bed6df] ">404</h1>
        <h3 className="text-[1.3rem] sm:text-[2rem] font-bold top-1/2 font-sans text-[#5790a8] absolute left-1/2 -translate-x-1/2 text-shadow-md shadow-secondary">Page Not Found</h3>
      </div>
        <div className="text-center my-4 mx-auto text-gray-600">
          <a href="/"
            className='bg-secondary hover:bg-[#2a6a83] p-4 text-sm sm:text-lg md:text-xl text-white rounded-md shadow-lg'
          >Go to Home Page</a>
        </div>
    </Layout>
  )
}
