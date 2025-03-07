import axios from "axios";

const api = process.env.NEXT_PUBLIC_API;

export const register = async (payload) => {
  try {
    const res = await axios.post(`${api}/users/register`, payload);
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: JSON.stringify(error.response?.data?.errors)?.replace(/[{"}]/g, '') || error.response?.data.message || error.message };
  }
};

export const login = async (payload) => {
  try {
    const res = await axios.post(`${api}/users/login`, payload);
    localStorage.setItem("token", res.data.token);
    return { status: true };

  } catch (error) {
    return { status: false, message: error.response.data.message || error.message };
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token") || "";

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
};