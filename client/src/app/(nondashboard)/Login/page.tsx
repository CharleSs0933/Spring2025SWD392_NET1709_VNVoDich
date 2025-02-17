"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import logo from "../../../asset/img/logo.png";
import bg from "../../../../public/bg-login.jpg";
import { useCreateAuthMutation, useGetAuthMutation } from "@/state/apiAuth";
import SignIn from "@/app/component/SignIn-Up/SignIn";
import SignUp from "@/app/component/SignIn-Up/SignUp";

const Login = () => {
  const [getAuth] = useGetAuthMutation();
  const [createAuth] = useCreateAuthMutation();

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
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const divLogo = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInSubmit = async () => {
    const { userName, passWord } = loginData;
    try {
      const response = await getAuth({
        username: userName,
        password: passWord,
      }).unwrap();
      console.log("Đăng nhập thành công:", response);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleSignUpSubmit = async () => {
    const { userName, passWord, confirmPassword } = signUpData;
    if (passWord !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    try {
      const response = await createAuth({
        username: userName,
        password: passWord,
      }).unwrap();
      console.log("Đăng ký thành công:", response);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="relative w-full h-[800px] overflow-hidden my-4">
      <Image
        src={bg}
        alt="Background"
        fill
        objectFit="cover"
        className="absolute inset-0"
      />
      <div
        ref={containerRef}
        className="flex w-full h-full justify-center items-center"
      >
        <div
          ref={divLogo}
          className="bg-[#25262F] w-[40%] h-[60%] bg-opacity-80 text-center flex flex-col items-center justify-start p-6"
        >
          <div ref={logoRef} className="mb-20 mt-10">
            <Image src={logo} alt="logo" width={250} height={200} />
          </div>
          <div className="pb-10">
            <h1 className="text-3xl font-bold">Welcome to Login Page</h1>
          </div>
        </div>

        <div
          ref={formRef}
          className="w-[25%] h-[60%] bg-white bg-opacity-70 backdrop-blur-md flex flex-col gap-16 p-6 text-green-900"
        >
          {isSignUp ? (
            <SignUp
              signUpData={signUpData}
              handleChange={handleSignUpChange}
              handleSubmit={handleSignUpSubmit}
              toggleAuthMode={() => setIsSignUp(false)}
            />
          ) : (
            <SignIn
              loginData={loginData}
              handleChange={handleSignInChange}
              handleSubmit={handleSignInSubmit}
              toggleAuthMode={() => setIsSignUp(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
