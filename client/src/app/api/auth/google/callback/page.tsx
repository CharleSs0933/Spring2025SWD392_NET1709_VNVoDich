"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLoginCallbackMutation } from "@/state/apiAuth";
// import { toast } from "sonner";

const GoogleAuthCallback = () => {
  const [googleLogin] = useGoogleLoginCallbackMutation();
  const router = useRouter();
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      const state = urlParams.get("state") ?? "";

      if (!authCode) {
        router.push("/login");
        return;
      }

      try {
        const response = await googleLogin({
          code: authCode,
          state: state,
        }).unwrap();

        // Lưu token vào localStorage hoặc Cookies
        localStorage.setItem("authToken", response.token);

        router.push("/dashboard");
      } catch (error) {
        console.error("Google login error:", error);
        // router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [googleLogin, router]);

  return <p>Processing Google Login...</p>;
};

export default GoogleAuthCallback;
