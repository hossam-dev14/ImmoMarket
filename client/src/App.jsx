// import React from "react";
import {Routes, Route} from 'react-router-dom';

// import Header from "./components/Header";

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
// import SignOut from './pages/SignOut';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

// From routes/index
// import Routes from './routes';

export default function App() {
  return (
    <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <RouteWrapper path="/signout" element={<SignOut/>} isPrivate /> */}
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<ErrorPage/>} />
    </Routes>

  );
}
