import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import path from "./ultils/path";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/public/Login";
import Auth from "./pages/public/Auth";
import Register from "./pages/public/Register";
import ForgotPassword from "./pages/public/ForgotPassword";
import Home from "./pages/public/Home";
import ResetPassword from "./pages/public/ResetPassword";
import Public from "./pages/public/Public";
import { useDispatch } from "react-redux";
import { getCategories } from "./store/app/asyncActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="font-main relative">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
        </Route>
        <Route
          path={path.REGISTER}
          element={
            <Auth>
              <Register />
            </Auth>
          }
        />
        <Route
          path={path.LOGIN}
          element={
            <Auth>
              <Login />
            </Auth>
          }
        />
        <Route
          path={path.FORGOT_PASSWORD}
          element={
            <Auth>
              <ForgotPassword />
            </Auth>
          }
        />
        <Route
          path={path.RESET_PASSWORD}
          element={
            <Auth>
              <ResetPassword />
            </Auth>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
