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

export const apiAddVarriant = (data, pid) =>
  axiosClient({
    url: "/product/varriant/" + pid,
    method: "put",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axiosClient({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiUpdateProduct = (data, pid) =>
  axiosClient({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axiosClient({
    url: "/product/",
    method: "post",
    data,
  });
