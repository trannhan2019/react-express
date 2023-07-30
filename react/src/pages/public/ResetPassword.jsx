import React from "react";
import InputField from "../../components/inputs/InputField";
import { apiResetPassword } from "../../apis/user";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../ultils/path";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    password: yup.string().required().min(6),
  })
  .required();

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleResetPassword = async ({ password }) => {
    const response = await apiResetPassword({ password, token });
    if (response.status) {
      toast.success(response.message);
      reset();
      navigate(`/${path.LOGIN}`);
    } else toast.error(response.message || response.errors[0].msg);
  };

  return (
    <div className=" bg-white flex flex-col items-center py-8 z-50">
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleResetPassword)}>
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
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
