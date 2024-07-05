import React from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signin from "./component/Signin";
import AditonalDetails from "./component/AditonalDetails";
import Profile from "./component/Profile";

const App = () => {
  return (
    <div className="max-w-screen min-h-screen bg-[#254f1a] flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/additionalDetails" element={<AditonalDetails />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
