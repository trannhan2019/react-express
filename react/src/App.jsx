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
import Products from "./pages/public/Products";
import DetailProduct from "./pages/public/DetailProduct";
import Blogs from "./pages/public/Blogs";
import Services from "./pages/public/Services";
import FAQ from "./pages/public/FAQ";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/app/asyncActions";
import Modal from "./components/common/Modal";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="font-main h-screen relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.ALL} element={<Home />} />
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
