"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetTutorSubMutation } from "@/state/apiAuth";
// import {  useGetTutorSubMutation, useGoogleLoginMutation } from "@/state/apiAuth";
const Login = () => {
  const [isMounted, setIsMounted] = useState(false);
 
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    userName: "",
    passWord: "",
  });
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    userName: "",
    passWord: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "Parent",
  });
  const containerRef = useRef(null);
  const divLogo = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const { login, signUp } = useUser();
  const [tutorSub] = useGetTutorSubMutation();

  const router = useRouter();

  useLayoutEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
    );

    gsap.fromTo(
      logoRef.current,
      { y: -100, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
      }
    );

    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: "power3.inOut" }
    );
  }, []);

  useLayoutEffect(() => {
    gsap.to(formRef.current, {
      x: isSignUp ? "-170%" : "0%",
      duration: 1,
      ease: "power3.inOut",
    });

    gsap.to(divLogo.current, {
      x: isSignUp ? "56%" : "0%",
      duration: 1,
      ease: "power3.inOut",
    });
  }, [isSignUp]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  

  const handleSubmit = async () => {
    if (isSignUp) {
      if (signUpData.passWord !== signUpData.confirmPassword) {
        alert("password dont match");
      } else {
        const res = await signUp({
          username: signUpData.userName,
          email: signUpData.email,
          full_name: signUpData.fullName,
          password: signUpData.passWord,
          role: signUpData.role,
          phone: signUpData.phone,
        });
        if (!res?.error) {
          setSignUpData({
            fullName: "",
            userName: "",
            passWord: "",
            confirmPassword: "",
            email: "",
            phone: "",
            role: "Parent",
          });
          setIsSignUp(!isSignUp);
        }
      }
    } else {
      await login({
        username: loginData.userName,
        password: loginData.passWord,
      });

      const userData = Cookies.get("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log(parsedUser);
        router.push("/");
        if (parsedUser.role === "Tutor") {
          const res = await tutorSub({ id: parsedUser.ID });
          if (res.data?.status) {
            Cookies.set("sub", res.data?.status, { path: "/", expires: 7 });
          }
        } else {
          Cookies.remove("sub");
        }
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8080/google/auth/login";
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="relative w-full h-[800px] overflow-hidden my-4">
      <Image
        src={
          "https://4mlgzdj164.ufs.sh/f/Y1D5BsqL0EJazReJSMBrHCa7AFqZWjLYJ5hKQEGNmvpufUMs"
        }
        alt="Background"
        fill
        objectFit="cover"
      />

      <div
        ref={containerRef}
        className="flex w-full h-full justify-center items-center"
      >
        <div
          ref={divLogo}
          className="bg-[#25262F] w-[40%] h-[60%] bg-opacity-80 text-center flex flex-col items-center justify-start p-6 rounded-xl"
        >
          <div ref={logoRef} className="mb-20 mt-10">
            <Image
              src={
                "https://4mlgzdj164.ufs.sh/f/Y1D5BsqL0EJaZBbwU6xaDpOV7H6W5L9RExeFt2Bmfv30zZqP"
              }
              alt="logo"
              width={250}
              height={200}
            />
          </div>
          <div className="pb-10">
            <h1 className="text-3xl font-bold">Welcome to Login Page</h1>
          </div>
        </div>

        <div
          ref={formRef}
          className="w-[25%] h-[60%] bg-white bg-opacity-70 backdrop-blur-md flex flex-col gap-16 p-6 text-green-900 rounded-xl"
        >
          <p className="text-3xl">
            {isSignUp ? "Create an Account" : "Sign in to get started!"}
          </p>

          <div className="flex flex-col gap-5">
            {isSignUp ? (
              <div className="grid grid-cols-2 gap-5">
                <input
                  className="p-2 border  rounded-[7px]"
                  placeholder="Full Name"
                  name="fullName"
                  value={signUpData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  placeholder="User Name"
                  name="userName"
                  value={signUpData.userName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  type="password"
                  placeholder="Password"
                  name="passWord"
                  value={signUpData.passWord}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={signUpData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleChange}
                  required
                />

                <select
                  className="p-2 border rounded-[7px]"
                  name="role"
                  value={signUpData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Parent">Parent</option>
                  <option value="Tutor">Tutor</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <input
                  className="p-2 border rounded-[7px]"
                  placeholder="User Name"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border rounded-[7px]"
                  type="password"
                  placeholder="Password"
                  name="passWord"
                  value={loginData.passWord}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              className="bg-[#25262F] text-white py-2 rounded-[7px]"
              onClick={handleSubmit}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>

            <button
              ref={buttonRef}
              onClick={handleGoogleLogin}
              className="bg-white-50 text-black py-2 rounded-[7px] hover:bg-blue-600 transition duration-300"
            >
              <p className="flex justify-center items-center gap-2">Google</p>
            </button>

            <div className="flex justify-around">
              {!isSignUp && (
                <p className="text-sm text-white-100 cursor-pointer hover:underline">
                  Forgot Your Password?
                </p>
              )}
              <p
                className="text-sm text-white-100 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
