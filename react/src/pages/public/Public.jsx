import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/headers/Header";
import TopHeader from "../../components/headers/TopHeader";
import Navigation from "../../components/navigation/Navigation";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex items-center flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
