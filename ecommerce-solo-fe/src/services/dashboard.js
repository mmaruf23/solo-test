import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API;

export const count = async () => {
  try {
    const res = await axios.get(`${api}/dashboard/count`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: JSON.stringify(error.response?.data?.errors)?.replace(/[{"}]/g, '') || error.response?.data.message || error.message };
  }
};