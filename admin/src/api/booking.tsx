import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const bookingApi = createApi({
  reducerPath: "booking",
  tagTypes: ["booking"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.polydevhotel.site/admin/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooking: builder.query<any, any>({
      query: () => `billings`,
      providesTags: ["booking"],
    }),
    getDetailBooking: builder.query<any, any>({
      query: (id) => ({
        url: `billings/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    searchRoom: builder.mutation({
      query: (data: any) => ({
        url: `booking/search`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['booking']
    }),
  }),
});

export const {
  useGetBookingQuery,
  useGetDetailBookingQuery,
  useSearchRoomMutation,
} = bookingApi;
export default bookingApi;
