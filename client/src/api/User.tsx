import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookie";

const userApi = createApi({
  reducerPath: "Users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_USER,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("userInfo") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<any, any>({
      query: () => `/profile`,
      providesTags: ["Users"],
    }),

    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `/update/avatar`,
        method: "PUT",
        body: data, // image
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/update/profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/update/password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getHistoryBooking: builder.query<any, any>({
      query: () => `/booking/history`,
      providesTags: ["Users"],
    }),

    getDetailHistoryBooking: builder.query<any, any>({
      query: (id) => `/booking/detail/${id}`,
      providesTags: ["Users"],
    }),

    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/booking/cancel/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    processReview: builder.mutation({
      query: (data) => ({
        url: `/rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    processLogout: builder.mutation<any, any>({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetHistoryBookingQuery,
  useGetDetailHistoryBookingQuery,
  useCancelBookingMutation,
  useProcessReviewMutation,
  useProcessLogoutMutation,
} = userApi;

export const userReducer = userApi.reducer;
export default userApi;
