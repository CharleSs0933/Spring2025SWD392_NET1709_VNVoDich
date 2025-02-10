import { User } from "@/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiAuth = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
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
