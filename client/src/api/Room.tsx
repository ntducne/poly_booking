import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const roomApi = createApi({
  reducerPath: "rooms",
  tagTypes: ["Rooms"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<any, any>({
      query: (page?: number) => {
        return {
          method: "GET",
          url: `/room?page=${page || 2}`,
        };
      },
      providesTags: ["Rooms"],
    }),
    searchRooms: builder.mutation<any, any>({
      query: (data: any) => {
        const url = "/v2/search";
        return {
          method: "POST",
          url: url,
          body: data,
        };
      },
      invalidatesTags: ["Rooms"],
    }),
    getDetail: builder.query<any, any>({
      query: (slug) => `/room/${slug}`,
      providesTags: ["Rooms"],
    }),
    postBooking: builder.mutation({
      query: (data: any) => ({
        url: `/room/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rooms"],
    }),
    postRates: builder.mutation({
      query: (data: any) => ({
        url: `user/rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rooms"],
    }),
    // postRates: builder.mutation({
    //   query: (data: any) => ({
    //     url: `/user/rate`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Rooms"],
    // }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetDetailQuery,
  usePostBookingMutation,
  // usePostRatesMutation,
  useSearchRoomsMutation,
} = roomApi;

export const roomReducer = roomApi.reducer;
export default roomApi;
