import React from "react";
import Header from "../../components/headers/Header";
import TopHeader from "../../components/headers/TopHeader";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
    </div>
  );
};

export default Public;
