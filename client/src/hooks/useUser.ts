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
      const data = await loginAPI({ username, password }).unwrap();

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
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setUser(null);
  };

  const handleGoogleLogin = () => {
    const googleWindow = window.open(
      "http://localhost:8080/google/auth/login",
      "Google Login",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    // Define event listener
    const receiveMessage = (event: MessageEvent) => {
      if (event.origin === "http://localhost:8080") {
        const { token, user } = event.data;

        if (token && user) {
          Cookies.set("token", token, { expires: 7 });
          Cookies.set("user", JSON.stringify(user), { expires: 7 });

          console.log("Token and user saved to cookies:", { token, user });

          // Close the popup safely
          if (googleWindow && !googleWindow.closed) {
            googleWindow.close();
          }

          // Redirect to homepage
          router.push("/");
        }
      }
    };

    // Listen for message from popup
    window.addEventListener("message", receiveMessage);

    // Remove listener after some time to avoid memory leaks
    setTimeout(() => {
      window.removeEventListener("message", receiveMessage);
    }, 5000);
  };

  const isLogged = !!user;

  return { user, loading, login, logout, signUp, isLogged, handleGoogleLogin };
};
