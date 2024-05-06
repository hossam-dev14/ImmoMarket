import React, { useState } from 'react';
import Layout from "../../Layout/DashLayout";
import MyListing from '../../components/MyListing';

const Dashboard = () => {

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto h-[79vh]">
          <MyListing />
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
