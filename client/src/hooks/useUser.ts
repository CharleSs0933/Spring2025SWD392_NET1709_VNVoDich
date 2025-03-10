"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLoginMutation, useSignupMutation } from "@/state/apiAuth";
import { useRouter } from "next/navigation";

// API endpoint
const API_URL = "http://localhost:8080";

interface User {}

export const useUser = () => {
  const [user, setUser] = useState<{
    ID: string;
    username: string;
    role: "Parent" | "Tutor" | "Children";
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
    email,
    role,
  }: {
    username: string;
    password: string;
    email: string;
    role: string;
  }) => {
    setLoading(true);
    try {
      console.log(username, password, "data");
      const data = await signUpApi({
        username,
        password,
        email,
        role,
      }).unwrap();

      console.log(data);
    } catch (error) {
      console.error("signUp failed:", error);
      return {error}

    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    router.prefetch("/login")
    router.push("/login")
    Cookies.remove("authToken");
    Cookies.remove("user");
    setUser(null);
  };

  const handleGoogleLogin = () => {
    const popup = window.open(
      "http://localhost:8080/google/auth/login",
      "_blank",
      "width=500,height=600"
    );

    const interval = setInterval(() => {
      if (!popup) {
        clearInterval(interval);
        console.log("Popup bị đóng.");
        return;
      }

      try {
        const popupUrl = popup.location.href;
        console.log(popupUrl);

        if (popupUrl.includes("localhost:8080/google/auth/login/callback")) {
          // Lấy dữ liệu từ `document.body.innerText`
          const jsonText = popup.document.body.innerText;
          const responseData = JSON.parse(jsonText);

          console.log("Dữ liệu từ popup:", responseData);

          // if (responseData?.data?.token) {
          //   localStorage.setItem("token", responseData.data.token);
          //   window.location.reload(); // Hoặc cập nhật state của app
          // }

          popup.close();
          clearInterval(interval);
        }
      } catch (error) {
        // Bỏ qua lỗi Cross-Origin nếu popup chưa load xong
      }
    }, 1000);
  };

  const isLogged = !!user;

  return { user, loading, login, logout, signUp, isLogged, handleGoogleLogin };
};
