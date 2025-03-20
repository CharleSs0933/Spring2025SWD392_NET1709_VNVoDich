"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLoginMutation, useSignupMutation } from "@/state/apiAuth";
import { useRouter } from "next/navigation";

// API endpoint

export const useUser = () => {
  const [user, setUser] = useState<{
    ID: string;
    username: string;
    role: "Parent" | "Tutor" | "Children" | "Admin";
    user_id: number;
    status: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [signUpApi] = useSignupMutation();
  const [loginApi] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData)); // Đọc thông tin user từ cookies
      } catch (error) {
        console.error("Invalid user data in cookies", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  // Hàm đăng nhập
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const data = await loginApi({ username, password }).unwrap();

      const { token, user } = data;

      // Lưu token và user vào cookies
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({
    username,
    password,
    full_name,
    email,
    role,
  }: {
    username: string;
    password: string;
    full_name: string;
    email: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      await signUpApi({
        username,
        password,
        full_name,
        email,
        role,
      });
    } catch (error) {
      console.error("signUp failed:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    router.prefetch("/login");
    router.push("/login");
    Cookies.remove("authToken");
    Cookies.remove("user");
    Cookies.remove("status");
    setUser(null);
    router.push("/login");
  };

  const isLogged = !!user;

  return { user, loading, login, logout, signUp, isLogged };
};
