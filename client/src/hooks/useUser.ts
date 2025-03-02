// "use client";

// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useLoginMutation } from "@/state/apiAuth";

// // API endpoint
// const API_URL = "http://localhost:8080";

// interface User {}

// export const useUser = () => {
//   const [user, setUser] = useState<{
//     ID: number;
//     username: string;
//     role: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loginAPI, { ...rest }] = useLoginMutation();

//   useEffect(() => {
//     const token = Cookies.get("authToken");
//     const userData = Cookies.get("user");

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData)); // Đọc thông tin user từ cookies
//       } catch (error) {
//         console.error("Invalid user data in cookies", error);
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);

//   // Hàm đăng nhập
//   const login = async ({
//     username,
//     password,
//   }: {
//     username: string;
//     password: string;
//   }) => {
//     setLoading(true);
//     try {
//       const data = await loginAPI({ username, password }).unwrap();

//       const { token, user } = data;

//       // Lưu token và user vào cookies
//       Cookies.set("authToken", token, {
//         expires: 7,
//         secure: true,
//         sameSite: "strict",
//       });
//       Cookies.set("user", JSON.stringify(user), {
//         expires: 7,
//         secure: true,
//         sameSite: "strict",
//       });

//       setUser(user);
//     } catch (error) {
//       console.error("Login failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Hàm đăng xuất
//   const logout = () => {
//     Cookies.remove("authToken");
//     Cookies.remove("user");
//     setUser(null);
//   };

//   return { user, loading, login, logout, ...rest };
// };
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLoginMutation, useSignupMutation } from "@/state/apiAuth";
import { error } from "console";

// API endpoint
const API_URL = "http://localhost:8080";

interface User {}

export const useUser = () => {
  const [user, setUser] = useState<{
    ID: number;
    username: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginAPI] = useLoginMutation();
  const [signUpApi] = useSignupMutation();

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

  // user name password email role

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

  return { user, loading, login, logout, signUp };
};
