import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API;

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${api}/orders/all`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const getDetailOrder = async (id) => {
  try {
    const res = await axios.get(`${api}/orders/${id}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const updateOrderStatus = async (payload) => {
  try {
    const res = await axios.patch(`${api}/orders/update`, payload, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const getOrderByStatus = async (status) => {
  try {
    const res = await axios.get(`${api}/orders/status/${status}`, getAuthHeader());

    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};