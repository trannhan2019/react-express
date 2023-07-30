import React, { memo } from "react";
import clsx from "clsx";

const InputField = ({
  register,
  nameKey,
  type,
  errors,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
}) => {
  return (
    <div className={clsx("flex flex-col relative mb-2", fullWidth && "w-full")}>
      {!isHideLabel && (
        <label
          className="text-[10px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        {...register(nameKey)}
        type={type || "text"}
        className={clsx(
          "px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none",
          errors && "border-red-500",
          style
        )}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
      />
      {errors && <small className="text-main italic">{errors.message}</small>}
    </div>
  );
};

// [{name: password, mes: Require}]

export default memo(InputField);
