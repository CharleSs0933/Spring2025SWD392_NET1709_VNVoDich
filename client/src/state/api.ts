import { Course, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    // prepareHeaders: async (headers) => {
    //   const token = await window.Clerk?.session?.getToken();
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

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  reducerPath: "api",
  tagTypes: ["Courses", "Tutors"],
  endpoints: (build) => ({
    getCourses: build.query<
      Course[],
      {
        page?: number;
        pageSize?: number;
        subject?: string;
        grade?: number;
        status?: string;
      }
    >({
      query: ({
        subject,
        grade,
        status,
        page,
        pageSize,
      }) => ({
        url: "/Courses",
        params: {
          page,
          pageSize,
          subject,
          grade,
          status,
        },
      }),
      transformResponse: (response: { message: string; data: Course[] }) => response.data,
      providesTags: ["Courses"],
    }),

    getTutors: build.query<
      User[],
      {
        id?: number;
        email?: string;
        full_name?: string;
        phone?: string;
        role?: string;
        google_id?: string;
        timezone?: string;
      }
    >({
      query: ({ id, email, full_name, phone, role, google_id, timezone }) => ({
        url: "/Tutors",
        params: { id, email, full_name, phone, role, google_id, timezone },
      }),
      transformResponse: (response: { message: string; data: User[] }) => response.data,
      providesTags: ["Tutors"],
    }),
  }),
});

export const { useGetCoursesQuery, useGetTutorsQuery } = api;