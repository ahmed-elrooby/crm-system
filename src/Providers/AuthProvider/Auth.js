"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const authContext = createContext(null);

const Auth = ({ children }) => {
  const router = useRouter();
  const [loadding, setLoadding] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API;

  // =========================
  // Login API
  // =========================

  const handleLogin = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/Users/login`, values);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };

  // =========================
  // Login Mutation
  // =========================

  const handleLoginMutation = useMutation({
    mutationFn: handleLogin,

    onSuccess: (data) => {
      console.log("Login Response:", data);
      Cookies.set("user", JSON.stringify(data.user), {
        expires: 7,
        sameSite: "strict",
      }); // =========================
      // Token
      // =========================

      if (data?.token) {
        Cookies.set("token", data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      // =========================
      // User
      // =========================

      const user = data?.user;

      // =========================
      // Role
      // =========================

      const role = user?.roles?.[0];

      console.log("User:", user);
      console.log("Role:", role);

      toast.success(data?.message || "تم تسجيل الدخول بنجاح");

      // =========================
      // Redirect
      // =========================

      if (role === "admin" || role === "Admin") {
        router.push("/Customers");
      } else if (role === "User") {
        router.push("/Customers");
      } else {
        router.push("/");
      }
    },

    onError: (error) => {
      console.log("Login Error:", error);

      const message =
        error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";

      toast.error(message);
    },
  });

  // =========================
  // Login Function
  // =========================

  const handleLoginFun = (values) => {
    handleLoginMutation.mutate(values);
  };

  // =========================
  // Context Value
  // =========================

  return (
    <authContext.Provider value={{ handleLoginFun, loadding }}>
      {children}
    </authContext.Provider>
  );
};

export default Auth;
