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

export async function GET(req: NextRequest) {
  // Lấy code và state từ query params (GET) hoặc body (POST)
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const queryString = url.searchParams.toString();

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }
  try {
    const data = await fetch(
      `http://localhost:8080/google/auth/login/callback?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
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

    if (!userData.email) {
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 400 }
      );
    }

    // const authToken = `mock-jwt-token-for-${userData.email}`;

    // const response = NextResponse.redirect(new URL("/login", req.url));
    // return response;
  } catch (error) {
    console.log("Google OAuth Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
