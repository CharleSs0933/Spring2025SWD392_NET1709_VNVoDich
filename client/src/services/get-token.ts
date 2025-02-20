"use server";
import { cookies } from "next/headers";

export async function getAuth() {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("authToken")?.value;
  const user: {
    ID: number;
    username: string;
    role: string;
  } = JSON.parse(cookieStore.get("user")?.value?.toString() || "{}");

  return { authToken, user };
}
