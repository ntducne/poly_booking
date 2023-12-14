import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clientApi = createApi({
  reducerPath: "Clients",
  tagTypes: ["Clients"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBranch: builder.query<any, any>({
      query: () => `/branch`,
      providesTags: ["Clients"],
    }),

    getRooms: builder.query<any, any>({
      query: () => {
        return {
          method: "GET",
          url: `/room`,
        };
      },
      providesTags: ["Clients"],
    }),

    getDetailRoom: builder.query<any, any>({
      query: (slug) => `/room/${slug}`,
      providesTags: ["Clients"],
    }),

    getRoomType: builder.query<any, any>({
      query: () => `/room/type`,
      providesTags: ["Clients"],
    }),

    handleBooking: builder.mutation({
      query: (data) => ({
        url: `/room/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    handleContact: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useHandleContactMutation,
  useGetBranchQuery,
  useGetRoomsQuery,
  useGetDetailRoomQuery,
  useGetRoomTypeQuery,
  useHandleBookingMutation,
} = clientApi;

export const userReducer = clientApi.reducer;
export default clientApi;
