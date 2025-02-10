import { Children, Course, Tutor, User } from "@/types";
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

    createCourse: build.mutation<Course, { tutor_id: string }>({
      query: (body) => ({
        url: `courses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: build.mutation<
      Course,
      { courseId: string; formData: FormData }
    >({
      query: ({ courseId, formData }) => ({
        url: `courses/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteCourse: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
    getTutor: build.query<Tutor, string>({
      query: (id) => `tutors/${id}`,
      providesTags: (result, error, id) => [{ type: "Tutors", id }],
    }),
    addLesson: build.mutation<
      Course,
      {
        courseId: string;
        title: string;
        description: string;
        learning_objectives: string;
        materials_needed: string;
      }
    >({
      query: ({
        courseId,
        title,
        description,
        learning_objectives,
        materials_needed,
      }) => ({
        url: `courses/${courseId}/add-lesson`,
        method: "PUT",
        body: {
          title,
          description,
          learning_objectives,
          materials_needed,
        },
      }),
      invalidatesTags: ["Courses"],
    }),

    updateLesson: build.mutation<
      Course,
      {
        courseId: string;
        lessonId: string | undefined;
        title: string;
        description: string;
        learning_objectives: string;
        materials_needed: string;
      }
    >({
      query: ({
        courseId,
        lessonId,
        title,
        description,
        learning_objectives,
        materials_needed,
      }) => ({
        url: `courses/${courseId}/update-lesson/${lessonId}`,
        method: "PUT",
        body: {
          title,
          description,
          learning_objectives,
          materials_needed,
        },
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteLesson: build.mutation<
      { messaege: string },
      {
        courseId: string;
        lessonId: string;
      }
    >({
      query: ({ courseId, lessonId }) => ({
        url: `courses/${courseId}/delete-lesson/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    getChildren: build.query<Children[], any>({
      query: () => ({
        url: "/children",
      }),
      providesTags: ["Children"],
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
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetTutorsQuery,
  useGetTutorQuery,
  useGetChildrenQuery,
} = api;
