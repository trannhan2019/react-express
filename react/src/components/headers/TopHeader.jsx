import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncActions";
import Swal from "sweetalert2";
import { clearMessage, logout } from "../../store/user/userSlice";

const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, message } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => clearTimeout(setTimeoutId);
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (message)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [message]);

  return (
    <div className="h-[38px w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <div className="flex gap-4 text-sm items-center">
            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span
              className="hover:rounded-full hover:bg-gray-200 cursor-pointer hover:text-main p-2"
              onClick={() => dispatch(logout())}
            >
              <AiOutlineLogout size={18} />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
