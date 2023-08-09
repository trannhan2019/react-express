import axiosClient from "../axiosClient";

export const apiGetProducts = (params) =>
  axiosClient({
    url: "/product/",
    method: "get",
    params,
  });
