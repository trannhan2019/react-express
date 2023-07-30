import React from "react";
import InputField from "../../components/inputs/InputField";
import path from "../../ultils/path";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../apis/user";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    mobile: yup.string().required(),
  })
  .required();

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const response = await apiRegister(data);
    if (response.status) {
      navigate(`/${path.LOGIN}`);
      reset();
      toast.success(response.message);
    } else toast.error(response.message || response.errors[0].msg);
  };

  return (
    <div>
      <h1 className="text-[28px] font-semibold text-main mb-8">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          <InputField
            register={register}
            nameKey="firstname"
            errors={errors.firstname}
          />
          <InputField
            register={register}
            nameKey="lastname"
            errors={errors.lastname}
          />
        </div>
        <InputField
          register={register}
          nameKey="email"
          fullWidth
          errors={errors.email}
        />
        <InputField
          register={register}
          nameKey="mobile"
          fullWidth
          errors={errors.mobile}
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
          Register
        </button>
      </form>
      <div className="flex items-center justify-between my-2 w-full text-sm">
        <Link
          className="text-blue-500 hover:underline cursor-pointer w-full text-center"
          to={`/${path.LOGIN}`}
        >
          Go login
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
}

export default Register;
