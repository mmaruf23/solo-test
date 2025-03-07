import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API;

export const addToCart = async (payload) => {
  try {
    const res = await axios.post(`${api}/carts/add`, payload, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response.data.message || error.message };
  }
};

export const getUserCart = async () => {
  try {
    const res = await axios.get(`${api}/carts/me`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response?.data?.message || error.message };
  }
};

export const deleteFromCart = async (productId) => {
  try {
    const res = await axios.delete(`${api}/carts/delete/${productId}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response?.data?.message || error.message };
  }
};

export const checkout = async () => {
  try {
    const res = await axios.post(`${api}/orders/checkout`, {}, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, message: error.response?.data?.message || error.message };
  }
};