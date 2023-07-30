import React from "react";
import { toast } from "react-toastify";
import { apiForgotPassword } from "../../apis/user";
import InputField from "../../components/inputs/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForgotPassword = async ({ email }) => {
    const response = await apiForgotPassword({ email });
    if (response.status) {
      toast.success(response.message, { theme: "colored" });
      reset();
    } else toast.error(response.message || response.errors[0].msg);
  };
  return (
    <div className="bg-white flex flex-col items-center py-8">
      <form onSubmit={handleSubmit(handleForgotPassword)}>
        <div className="flex flex-col gap-4">
          <InputField
            register={register}
            nameKey="email"
            fullWidth
            errors={errors.email}
          />
          <div className="flex items-center justify-end w-full gap-4">
            <button className="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2">
              Send Email
            </button>
            <button>Back</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
