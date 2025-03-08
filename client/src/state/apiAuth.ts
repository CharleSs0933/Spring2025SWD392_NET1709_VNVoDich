import { Children, Course, Tutor, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import Cookies from "js-cookie";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    // prepareHeaders: async (headers) => {
    //   const token = Cookies.get("authToken");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAuth",
  tagTypes: [],
  endpoints: (build) => ({
    login: build.mutation<any, { username: string; password: string }>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
    }),
    signup: build.mutation<
      any,
      { username: string; password: string; email: string; role: string }
    >({
      query: (body) => ({
        url: `auth/register`,
        method: "POST",
        body,
      }),
    }),
    googleLogin: build.mutation({
      query: () => ({
        url: `google/auth/login`,
        method: "GET",
        credentials: "include",
      }),
    }),
    googleLoginCallback: build.mutation({
      query: ({ code, state }: { code: string; state: string }) => ({
        url: `/google/auth/login/callback`,
        method: "GET",
        credentials: "include", // Đảm bảo cookie `oauth_state` được gửi đi
        params: {
          code,
          state,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useGoogleLoginCallbackMutation,
  useSignupMutation,
} = apiAuth;
