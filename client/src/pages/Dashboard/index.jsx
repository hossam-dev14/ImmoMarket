import React, { useState } from 'react';
import Layout from "../../Layout/DashLayout";
// import { Link, Route, Routes } from 'react-router-dom';
// import logo from '../../assets/images/logo.png'
// import { SlMenu, SlLayers, SlPlus, SlEnvolope, SlHome, SlBubbles, SlHeart, SlLogout, SlUser, SlBubble } from "react-icons/sl";
// import Profile from '../Profile';
import MyListing from '../../components/MyListing';

const Dashboard = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [selectedMenuItem, setSelectedMenuItem] = useState('');

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <MyListing />
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
