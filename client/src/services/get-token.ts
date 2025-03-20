"use server";
import { cookies } from "next/headers";

export async function getAuth() {
  const cookieStore = await cookies(); // No need for await

  const authToken = cookieStore.get("authToken")?.value || null;
  const isSub = cookieStore.get("sub")?.value || null;

  let user: {
    ID: number;
    username: string;
    role: "Parent" | "Tutor" | "Children" | "Admin";
  } | null = null;

  try {
    const userCookie = cookieStore.get("user")?.value;
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
  }

  const isLogged = !!user;

  return { authToken, user, isLogged, isSub };
}
