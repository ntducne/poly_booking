import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const billingApi = createApi({
  reducerPath: "billings",
  tagTypes: ["billings"],
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
    getBilings: builder.query<any, any>({
      query: () => `billings`,
      providesTags: ["billings"],
    }),
    getDetailBilings: builder.query<any, any>({
      query: (id) => ({
        url: `billings/${id}`,
        method: "GET",
      }),
      providesTags: ["billings"],
    }),
    checkinBooking: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `booking/handle/checkin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["billings"],
    }),
    checkoutBooking: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `booking/handle/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["billings"],
    }),
    cancelBooking: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `booking/handle/cancel`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["billings"],
    }),
    addPeopleBooking: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `booking/handle/addPeople`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["billings"],
    }),
    addServiceBooking: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `booking/handle/addService`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["billings"],
    }),
  }),
});

export const {
  useGetBilingsQuery,
  useGetDetailBilingsQuery,
  useCheckinBookingMutation,
  useCheckoutBookingMutation,
  useAddPeopleBookingMutation,
  useAddServiceBookingMutation,
  useCancelBookingMutation,
} = billingApi;
export default billingApi;
