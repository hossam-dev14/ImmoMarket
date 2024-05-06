import React, { useState } from 'react';
import Layout from "../../Layout/DashLayout";
// import { Link, Route, Routes } from 'react-router-dom';
// import logo from '../../assets/images/logo.png'
// import { SlMenu, SlLayers, SlPlus, SlEnvolope, SlHome, SlBubbles, SlHeart, SlLogout, SlUser, SlBubble } from "react-icons/sl";
// import Profile from '../Profile';
import MyListing from '../../components/MyListing';

const PropertyList = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [selectedMenuItem, setSelectedMenuItem] = useState('');

  return (
    <Layout>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto h-[78vh]">
        <div className="flex flex-col text-center w-full mb-16">
          <strong className="text-secondary sm:text-3xl text-2xl font-bold title-font mb-2">
            My Properties
          </strong>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to your dashboard!</p>
        </div>
        <MyListing />
      </div>
      </section>
    </Layout>
  );
};

export default PropertyList;
