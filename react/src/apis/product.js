import axiosClient from "../axiosClient";

export const apiGetProducts = (params) =>
  axiosClient({
    url: "/product/",
    method: "get",
    params,
  });
export const apiGetProduct = (pid) =>
  axiosClient({
    url: "/product/" + pid,
    method: "get",
  });
export const apiRatings = (data) =>
  axiosClient({
    url: "/product/ratings",
    method: "put",
    data,
  });
