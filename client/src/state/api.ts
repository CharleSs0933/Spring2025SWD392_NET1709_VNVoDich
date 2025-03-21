import {
  Availability,
  Children,
  Course,
  CourseSubcription,
  Parent,
  TeachingSession,
  Tutor,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { url } from "inspector";

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
  tagTypes: ["Courses", "Tutors", "Parents", "Children", "TeachingSessions"],
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
        userId?: number;
      }
    >({
      query: ({ subject, grade, status, page, pageSize, title, userId }) => ({
        url: "courses",
        params: {
          page,
          pageSize,
          subject,
          grade,
          status,
          title,
          userId,
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
      { courseId: number; formData: FormData }
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
      invalidatesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    getTutor: build.query<Tutor, string>({
      query: (id) => `tutors/${id}`,
      providesTags: (result, error, id) => [{ type: "Tutors", id }],
    }),

    checkTutorConnection: build.query<
      {
        isConnected: boolean;
        description: string;
      },
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `tutors/${userId}/check-connection`,
      }),
    }),

    connectToStripe: build.mutation<
      { destination: string; onboardingUrl: string },
      {}
    >({
      query: () => ({
        url: "tutors/create-connected-account",
        method: "POST",
      }),
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

    updateTutor: build.mutation<Tutor, { tutorId: string; formData: FormData }>(
      {
        query: ({ tutorId, formData }) => ({
          url: `tutors/${tutorId}`,
          method: "PUT",
          body: formData,
        }),
        invalidatesTags: ["Tutors"],
      }
    ),

    addLesson: build.mutation<
      Course,
      {
        courseId: string;
        title: string;
        description: string;
        learning_objectives: string;
        materials_needed: string;
        homework: string;
      }
    >({
      query: ({
        courseId,
        title,
        description,
        learning_objectives,
        materials_needed,
        homework,
      }) => ({
        url: `courses/${courseId}/add-lesson`,
        method: "PUT",
        body: {
          title,
          description,
          learning_objectives,
          materials_needed,
          homework,
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
        username: string;
        full_name: string;
        password: string;
        date_of_birth: string;
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
        username: string;
        full_name: string;
        password: string;
        date_of_birth: string;
        learning_goals: string;
      }
    >({
      query: ({
        id,
        username,
        full_name,
        learning_goals,
        password,
        date_of_birth,
      }) => ({
        url: `/childrens/${id}`,
        method: "PUT",
        body: { username, full_name, learning_goals, password, date_of_birth },
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
      { courseId: string; type?: "Day" | "Week" }
    >({
      query: ({ courseId, type }) => ({
        url: `/availabilities/course/${courseId}`,
        params: {
          type,
        },
      }),
    }),

    /* 
    ===============
    TEACHING SESSIONS
    =============== 
    */
    getSession: build.query<TeachingSession[], { userId: number }>({
      query: ({ userId }) => ({
        url: `/teaching-sessions`,
        params: { userId },
      }),
      providesTags: ["TeachingSessions"],
    }),
    updateSession: build.mutation<
      TeachingSession,
      {
        startTime?: string;
        endTime?: string;
        comment?: string;
        rating?: number;
        teaching_quality?: string;
        status?: string;
        homework_assigned?: string;
        id: number;
      }
    >({
      query: ({
        startTime,
        endTime,
        comment,
        rating,
        teaching_quality,
        status,
        homework_assigned,
        id,
      }) => ({
        url: `/teaching-sessions/${id}`,
        method: "PUT",
        body: {
          startTime,
          endTime,
          comment,
          rating,
          teaching_quality,
          status,
          homework_assigned,
        },
      }),
      invalidatesTags: ["TeachingSessions"],
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
    cancelBooking: build.mutation<
      CourseSubcription,
      { subscriptionId: number }
    >({
      query: ({ subscriptionId }) => ({
        url: `/bookings/cancel`,
        method: "PUT",
        body: { subscriptionId },
      }),
    }),
    getParentBookings: build.query<CourseSubcription[], any>({
      query: () => ({
        url: `/bookings/parent`,
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

    updateParent: build.mutation<
      Parent,
      { parentId: number; formData: FormData }
    >({
      query: ({ parentId, formData }) => ({
        url: `parent/${parentId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Parents"],
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
  useUpdateTutorMutation,
  useGetChildrenQuery,
  useGetChildQuery,
  useCreateChildrenMutation,
  useUpdateChildrenMutation,
  useDeleteChildrenMutation,
  useGetTutorAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useGetCourseAvailabilityQuery,
  useGetSessionQuery,
  useUpdateSessionMutation,
  useCreateStripePaymentIntentMutation,
  useCreateTrialBookingMutation,
  useCancelBookingMutation,
  useGetParentBookingsQuery,
  useGetAllParentsQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
  useLazyCheckTutorConnectionQuery,
  useConnectToStripeMutation,
} = api;
