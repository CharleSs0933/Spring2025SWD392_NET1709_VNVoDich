import { Children, Course, Tutor, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

export const apiAuth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  reducerPath: "apiAuth",
  tagTypes: [],
  endpoints: (build) => ({}),
});

export const {} = apiAuth;
