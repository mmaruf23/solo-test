import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API;

export const getProducts = async (page = 0, size = 10) => {
  try {
    const res = await axios.get(`${api}/products/all?page=${page}&size=${size}`);
    // console.log(res);
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getCategories = async () => {
  console.log("GET CATGEORY");

  try {
    const res = await axios.get(`${api}/categories/all`);
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const searchProduct = async (key) => {
  try {
    const res = await axios.get(`${api}/products/search?keyword=${key}`);
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getProductDetails = async (slug) => {
  try {
    const res = await axios.get(`${api}/products/${slug}`);
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getProductCategory = async (id, page = 0, size = 10) => {
  try {
    const res = await axios.get(`${api}/products/category/${id}?page=${page}&size=${size}`);
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${api}/products/delete/${id}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const addProduct = async (payload) => {
  try {
    const res = await axios.post(`${api}/products/add`, payload, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getById = async (id) => {
  try {
    const res = await axios.get(`${api}/products/id/${id}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const editById = async (id, payload) => {
  try {
    const res = await axios.put(`${api}/products/edit/${id}`, payload, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response.data.errors);

    return { status: false, message: error.response?.data?.message || error.message };
  }
}

