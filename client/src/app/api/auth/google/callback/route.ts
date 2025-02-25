// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useGoogleLoginCallbackMutation } from "@/state/apiAuth";
// // import { toast } from "sonner";

// const GoogleAuthCallback = () => {
//   const [googleLogin] = useGoogleLoginCallbackMutation();
//   const router = useRouter();
//   useEffect(() => {
//     const handleGoogleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const authCode = urlParams.get("code");
//       const state = urlParams.get("state") ?? "";

//       if (!authCode) {
//         router.push("/login");
//         return;
//       }

//       try {
//         const response = await googleLogin({
//           code: authCode,
//           state: state,
//         }).unwrap();

//         // Lưu token vào localStorage hoặc Cookies
//         localStorage.setItem("authToken", response.token);

//         router.push("/dashboard");
//       } catch (error) {
//         console.error("Google login error:", error);
//         // router.push("/login");
//       }
//     };

//     handleGoogleCallback();
//   }, [googleLogin, router]);

//   return <p>Processing Google Login...</p>;
// };

// export default GoogleAuthCallback;

import { NextRequest, NextResponse } from "next/server";

interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

interface GoogleUserResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface ApiResponse {
  token?: string;
  user?: GoogleUserResponse;
  error?: string;
}

const GOOGLE_CLIENT_ID =
  "381787553992-p5mimirtf3adgu6gqpb1ag0jkrkpogm6.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/api/auth/google/callback";

export async function GET(req: NextRequest) {
  // Lấy code và state từ query params (GET) hoặc body (POST)
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }
  try {
    // const data = await fetch(
    //   `http://localhost:8080/google/auth/login/callback?state=${state}&code=${code}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID || "",
      client_secret: GOOGLE_CLIENT_SECRET || "",
      code,
      grant_type: "authorization_code",
      redirect_uri: GOOGLE_REDIRECT_URI || "",
    });

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const tokenData: GoogleTokenResponse = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 400 }
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const userData: GoogleUserResponse = await userResponse.json();

    console.log(userData);

    if (!userData.email) {
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 400 }
      );
    }

    // const authToken = `mock-jwt-token-for-${userData.email}`;

    const response = NextResponse.redirect(new URL("/login", req.url));
    return response;

    // return res.status(200).json({ token: authToken, user: userData });
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
