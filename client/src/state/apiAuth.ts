import { getAuthToken } from "../services/get-token";
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: async (headers) => {
      const token = getAuthToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080"
  }),
  reducerPath: "apiAuth",
  tagTypes: [],
  endpoints: (build) => ({
    getAuth: build.mutation<
      {
        token: string;
        user: {
          username: string;
          email: string;
          role: string;
        };
      },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),
    createAuth: build.mutation<
      { username: string; role: string; email: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useGetAuthMutation, useCreateAuthMutation } = apiAuth;
