"use server";

import { cookies } from "next/headers";
import { LoginFormSchema, SignupFormSchema } from "./definitions";
import { redirect } from "next/navigation";
const config = {
  maxAge: 60 * 60 * 1, 
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
export async function registerUserAction(prevState: any, formData: FormData) {
  console.log("Hello");

  const validatedFields = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    passWord: formData.get("passWord"),
    fullName: formData.get("fullName"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      ZodError: validatedFields.error?.flatten().fieldErrors,
      authApiError: null,
      message: "Missing Fields. Failed to Register",
    };
  }

  const { userName, passWord } = validatedFields.data;

  try {
    const response = await fetch("https://desktop-7aud0c8.tail682e6a.ts.net/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: passWord }),
    });
    const responseData = await response.json();
    if (!responseData.error) {
      console.log("#############");
      console.log("User Registered Successfully", responseData);
      console.log("#############");
    } else {
      console.log("User Registered Fail", responseData.error);
      throw new Error(responseData.error);
    }

    return {
      ...prevState,
      authApiError: null,
      ZodErrors: null,
      message: "User registered successfully!",
    };
  } catch (error: any) {
    return {
      ...prevState,
      authApiError: error,
      ZodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }
}

export async function loginUserAction(prevState: any, formData: FormData) {
  console.log("Hello");

  const validatedFields = LoginFormSchema.safeParse({
    userName: formData.get("userName"),
    passWord: formData.get("passWord"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      ZodError: validatedFields.error?.flatten().fieldErrors,
      authApiError: null,
      message: "Missing Fields. Failed to Login",
    };
  }

  const { userName, passWord } = validatedFields.data;
  let loginSuccess = false;

  try {
    const response = await fetch("https://desktop-7aud0c8.tail682e6a.ts.net/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: passWord }),
    });
    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error);
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", responseData.token, config);
    loginSuccess = true;
    console.log(responseData, "ok");
  } catch (error: any) {
    return {
      ...prevState,
      authApiError: error.message,
      ZodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (loginSuccess) {
    redirect("/");
  }

  return {
    ...prevState,
    authApiError: null,
    ZodErrors: null,
    message: "User Login successfully!",
  };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
