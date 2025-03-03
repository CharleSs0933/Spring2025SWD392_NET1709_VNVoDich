import {
  Availability,
  Children,
  Course,
  Parent,
  TeachingSession,
  Tutor,
  User,
} from "@/types";
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
    baseUrl: "http://localhost:8000",
    prepareHeaders: async (headers) => {
      const token = Cookies.get("authToken");
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
        url: `childrens`,
      }),
      providesTags: ["Children"],
    }),

    getChild: build.query<Children, any>({
      query: ({ id }) => `/childrens/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    createChildren: build.mutation<
      Children,
      {
        full_name: string;
        password: string;
        age: number;
        grade_level: string;
        learning_goals: string;
      }
    >({
      query: (body) => ({
        url: `/childrens`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Children"],
    }),

    updateChildren: build.mutation<
      Children,
      {
        id: string;
        full_name: string;
        password: string;
        age: number;
        grade_level: string;
        learning_goals: string;
      }
    >({
      query: ({
        id,
        full_name,
        age,
        learning_goals,
        password,
        grade_level,
      }) => ({
        url: `/childrens/${id}`,
        method: "PUT",
        body: { full_name, age, learning_goals, password, grade_level },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    deleteChildren: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/childrens/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Children"],
    }),

    getTutors: build.query<
      Tutor[],
      {
        full_name?: string;
        phone?: string;
        qualifications?: string;
        teaching_style?: string;
      }
    >({
      query: ({ full_name, phone, qualifications, teaching_style }) => ({
        url: "/tutors",
        params: {
          full_name,
          phone,
          qualifications,
          teaching_style,
        },
      }),
      providesTags: ["Tutors"],
    }),

    /// Availability
    getTutorAvailability: build.query<Availability | null, {}>({
      query: ({}) => ({
        url: "/availabilities",
      }),
    }),

    updateAvailability: build.mutation<any, Availability>({
      query: (data) => ({
        url: "/availabilities/update",
        method: "PUT",
        body: data,
      }),
    }),

    getCourseAvailability: build.query<
      { date: string; slots: string[] }[],
      { courseId: string }
    >({
      query: ({ courseId }) => ({
        url: `/availabilities/course/${courseId}`,
      }),
    }),

    // Teaching session
    getSession: build.query<TeachingSession[], { childrenId: number }>({
      query: ({ childrenId }) => ({
        url: `/teaching-sessions/child/${childrenId}`,
      }),
    }),

    /* 
    ===============
    BOOKINGS
    =============== 
    */

    createStripePaymentIntent: build.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: ({ amount }) => ({
        url: `/bookings/stripe/payment-intent`,
        method: "POST",
        body: { amount },
      }),
    }),
    createTrialBooking: build.mutation<any, any>({
      query: (body) => ({
        url: `/bookings/create-trial-booking`,
        method: "POST",
        body,
      }),
    }),
    getAllParents: build.query<Parent[], void>({
      query: () => ({
        url: "/parent",
      }),
    }),

    getParentById: build.query<Parent, { userId: number }>({
      query: ({ userId }) => ({
        url: `/parent/${userId}`,
      }),
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
  useGetChildQuery,
  useCreateChildrenMutation,
  useUpdateChildrenMutation,
  useDeleteChildrenMutation,
  useGetTutorAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useGetCourseAvailabilityQuery,
  useGetSessionQuery,
  useCreateStripePaymentIntentMutation,
  useCreateTrialBookingMutation,
  useGetAllParentsQuery,
  useGetParentByIdQuery,
} = api;
