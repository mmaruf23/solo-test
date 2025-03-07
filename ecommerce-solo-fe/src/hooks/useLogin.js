import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  return [isLogin, setIsLogin];
};

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = jwtDecode(token).role;
      if (role == "ADMIN") setIsAdmin(true);
    }
  }, []);
  return isAdmin;
};