import React from "react";
import InputField from "../../components/inputs/InputField";
import { apiLogin } from "../../apis/user";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // SUBMIT
  const onSubmit = async (data) => {
    const response = await apiLogin(data);
    if (response.status) {
      dispatch(
        login({
          isLoggedIn: true,
          token: response.accessToken,
          userData: response.userData,
        })
      );
      navigate(`/${path.HOME}`);
      reset();
      toast.success("login success!!");
    } else {
      toast.error(response.message || response.errors[0].msg);
    }
  };

  return (
    <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
      <h1 className="text-[28px] font-semibold text-main mb-8">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          register={register}
          nameKey="email"
          fullWidth
          errors={errors.email}
        />

        <InputField
          register={register}
          nameKey="password"
          type="password"
          fullWidth
          errors={errors.password}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-main text-semibold my-2 w-full"
        >
          Login
        </button>
      </form>
      <div className="flex items-center justify-between my-2 w-full text-sm">
        <Link
          to={`/${path.FORGOT_PASSWORD}`}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Forgot your account?
        </Link>

        <Link
          className="text-blue-500 hover:underline cursor-pointer"
          to={`/${path.REGISTER}`}
        >
          Create account
        </Link>
      </div>
      <Link
        className="text-blue-500 text-sm hover:underline cursor-pointer"
        to={`/${path.HOME}`}
      >
        Go home?
      </Link>
    </div>
  );
};

export default Login;
