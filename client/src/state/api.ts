import { Children, Course, Tutor, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { create } from "domain";

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
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Tutors", "Children"],
  endpoints: (build) => ({
    getCourses: build.query<
      Course[],
      {
        page?: number;
        pageSize?: number;
        subject?: string;
        grade?: string;
        status?: string;
        title?: string;
      }
    >({
      query: ({ subject, grade, status, page, pageSize, title }) => ({
        url: "/Courses",
        params: {
          page,
          pageSize,
          subject,
          grade,
          status,
          title,
        },
      }),
      providesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    createCourse: build.mutation<Course, { tutor_id: string }>({
      query: (body) => ({
        url: `courses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: build.mutation<Course, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Courses", id }],
    }),

    deleteCourse: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    getChildren: build.query<Children[], any>({
      query: (parent_id) => ({
        url: `childrens/${parent_id}`,
      }),
      providesTags: ["Children"],
    }),

    getChild: build.query<Children, { parent_id: string; id: string }>({
      query: ({ parent_id, id }) => `/childrens/${parent_id}/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    createChildren: build.mutation<Children, { parent_id: string }>({
      query: (body) => ({
        url: `/children`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Children"],
    }),

    updateChildren: build.mutation<
      Children,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/children/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    deleteChildren: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/children/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Children"],
    }),

    getTutors: build.query<Tutor[], {}>({
      query: ({}) => ({
        url: "/tutors",
        params: {},
      }),
      providesTags: ["Tutors"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetTutorsQuery,

  useGetChildrenQuery,
  useGetChildQuery,
  useCreateChildrenMutation,
  useUpdateChildrenMutation,
  useDeleteChildrenMutation,
} = api;
