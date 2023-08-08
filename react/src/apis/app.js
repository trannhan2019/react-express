import axiosClient from "../axiosClient";

export const apiGetCategories = () =>
  axiosClient({
    url: "/prodcategory/",
    method: "get",
  });
