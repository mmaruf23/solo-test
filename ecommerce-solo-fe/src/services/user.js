import axios from "axios";
import { getAuthHeader } from "./auth";

const api = process.env.NEXT_PUBLIC_API;

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${api}/users/all`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const getUsersByRole = async (role) => {
  try {
    const res = await axios.get(`${api}/users/role/${role}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const deleteUser = async (username) => {
  try {
    const res = await axios.delete(`${api}/users/delete/${username}`, getAuthHeader());
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};

export const updateRole = async (username, newRole) => {
  try {
    const res = await axios.patch(`${api}/users/role/${username}?set=${newRole}`, {}, getAuthHeader());
    return { status: true, data: res.data };

  } catch (error) {
    console.log(error.response);
    return { status: false, message: error.message };
  }
};