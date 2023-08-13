import axiosClient from "../axiosClient";

export const apiRegister = (data) =>
  axiosClient({
    url: "/auth/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiForgotPassword = (data) =>
  axiosClient({
    url: "/auth/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axiosClient({
    url: "/auth/resetpassword",
    method: "put",
    data,
  });

export const apiRefresh = () =>
  axiosClient({
    url: "/auth/refresh",
    method: "get",
    withCredentials: true,
  });

export const apiGetCurrent = () =>
  axiosClient({
    url: "/user/current",
    method: "get",
  });

export const apiUpdateCurrent = (data) =>
  axiosClient({
    url: "/user/current",
    method: "put",
    data,
  });

export const apiGetUsers = (params) =>
  axiosClient({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, uid) =>
  axiosClient({
    url: "/user/" + uid,
    method: "put",
    data,
  });
export const apiDeleteUser = (uid) =>
  axiosClient({
    url: "/user/" + uid,
    method: "delete",
  });
