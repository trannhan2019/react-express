import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../../apis/product";

export const getNewProducts = createAsyncThunk(
  "product/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: "-createdAt" });
    if (!response.status) return rejectWithValue(response);
    return response.products;
  }
);
