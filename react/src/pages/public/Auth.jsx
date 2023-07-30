import React from "react";

function Auth({ children }) {
  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Auth;
