import React, { memo, useEffect } from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;

const Header = () => {
  return (
    <div>
      <p>header</p>
    </div>
  );
};

export default memo(Header);
