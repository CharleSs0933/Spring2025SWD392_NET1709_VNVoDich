import { Package, RefundRequest, Subscription, Users } from "@/types";
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
    baseUrl: "https://desktop-7aud0c8.tail682e6a.ts.net/",
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
      // toast.error(`Error: ${errorMessage}`);
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
  tagTypes: ["Payment"],
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

    ///Admin
    getUsers: build.query<Users[] | null, {}>({
      query: ({}) => ({
        url: `/api/admin/users`,
      }),
      transformResponse: (response: { data: Users[] }) => response.data,
    }),

    deleteUser: build.mutation<
      Users,
      {
        id: number;
      }
    >({
      query: ({ id }) => ({
        url: `/api/admin/users/${id}`,
        method: "DELETE",
      }),
    }),

    updateUser: build.mutation<
      Users,
      {
        id: number;
        email: string;
        full_name: string;
        phone: string;
      }
    >({
      query: ({ id, email, full_name, phone }) => ({
        url: `/api/admin/user/update?id=${id}`,
        method: "PUT",
        body: { email, full_name, phone },
      }),
    }),

    //Package
    getPackage: build.query<Package[] | null, {}>({
      query: ({}) => ({
        url: `/subscription/plans`,
      }),
      transformResponse: (response: { data: Package[] }) => response.data,
    }),

    createPackageTutor: build.mutation<
      any,
      {
        tutor_id: number;
        plan_id: number;
        billing_cycle: string;
      }
    >({
      query: (body) => ({
        url: `/api/subscription`,
        method: "POST",
        body,
      }),
    }),

    getTutorSub: build.mutation<any | null, { id: number }>({
      query: ({ id }) => ({
        url: `/api/subscription/tutor/${id}`,
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    createPayMent: build.mutation<
      any | null,
      { amount: number; description: string; orderId: string }
    >({
      query: ({ amount, description, orderId }) => ({
        url: `/api/payment/create?amount=${amount}&description=${description}&orderId=${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["Payment"],
    }),

    getSubscription: build.query<Subscription[] | null, {}>({
      query: ({}) => ({
        url: `/api/admin/subscriptions`,
      }),
      transformResponse: (response: { data: Subscription[] }) => response.data,
    }),

    createPackage: build.mutation<
      Package | null,
      {
        name: string;
        description: string;
        price_monthly: number;
        price_annually: number;
        max_courses: number;
        is_active: boolean;
      }
    >({
      query: (body) => ({
        url: `/api/admin/subscription/plans`,
        method: "POST",
        body,
      }),
    }),

    updatePackage: build.mutation<
      Package | null,
      {
        id: number;
        name: string;
        description: string;
        price_monthly: number;
        price_annually: number;
        max_courses: number;
        is_active: boolean;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/api/admin/subscription/plans/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deletePackage: build.mutation<
      Package | null,
      {
        id: number;
      }
    >({
      query: ({ id }) => ({
        url: `/api/admin/subscription/plans/${id}`,
        method: "DELETE",
      }),
    }),

    createRequestRefund: build.mutation< any | null , {order_id : string , amount: number , card_number: string ,reason : string}>({
      query: ( body ) => ({
        url: `/api/refunds`,
        method: "POST",
        body: body
      }),
    }),
    getRequestRefundByID: build.query< RefundRequest | null , {id : number}>({
      query: (id) => ({
        url: `/api/refunds/${id}`,
      }),
      transformResponse: (response: { data: RefundRequest }) => response.data,
    }),

    getRefundStatistics: build.query<RefundRequest[] | null, {}>({
      query: () => ({
        url: `/api/admin/refunds/statistics`,
      }),
      transformResponse: (response: { data: RefundRequest[] }) => response.data,
    }),

    updateStatusRefundRequest : build.mutation< any | null , {id: number , status : string , admin_note: string}>({
      query: ({ id, ...body} ) => ({
        url: `/api/admin/refunds/${id}/process`,
        method: "PUT",
        body : body
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useGoogleLoginCallbackMutation,
  useSignupMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetPackageQuery,
  useCreatePackageTutorMutation,
  useUpdateUserMutation,
  useGetTutorSubMutation,
  useGetSubscriptionQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useCreatePayMentMutation,
  useCreateRequestRefundMutation,
  useGetRefundStatisticsQuery,
  useGetRequestRefundByIDQuery,
  useUpdateStatusRefundRequestMutation,

} = apiAuth;
