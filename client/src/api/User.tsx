import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCookies } from "react-cookie";

const userApi = createApi({
  reducerPath: "Users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + "/user/",
    prepareHeaders: (headers) => {
      const [cookies] = useCookies(["userInfo"]);
      const token = cookies.userInfo?.accessToken?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<any, any>({
      query: () => `profile`,
      providesTags: ["Users"],
    }),

    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `update/avatar`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `update/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: `update/password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getHistoryBooking: builder.query<any, any>({
      query: () => `booking/history`,
      providesTags: ["Users"],
    }),

    getDetailHistoryBooking: builder.query<any, any>({
      query: (id) => `booking/history/${id}`,
      providesTags: ["Users"],
    }),

    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `booking/cancel/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    processReview: builder.mutation({
      query: (data) => ({
        url: `rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    processLogout: builder.query<any, any>({
      query: () => `logout`,
      providesTags: ["Users"],
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
  useProcessLogoutQuery,
} = userApi;

export const userReducer = userApi.reducer;
export default userApi;
