import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCookies } from "react-cookie";

const roomApi = createApi({
  reducerPath: "Rooms",
  tagTypes: ["Rooms"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_CLIENT,
    prepareHeaders: (headers) => {
      const [cookies] = useCookies(['userInfo']);
      const token = cookies.userInfo?.accessToken?.token;
      console.log(token);
      
      if (token) {
          headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
  },
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<any, any>({
      query: (data: any) => {
        const keys = Object.keys(data);
        const url =
          keys.length === 0 && keys.length < 6
            ? `/room`
            : `/v2/search?checkin=${data.checkin}&checkout=${data.checkout}&adult=${data.adult}&child=${data.child}&branch_id=${data.branch_id}&amount_room=${data.soLuong}`;
        return {  
          method: "GET",
          url: url,
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
        url: `client/room/booking`,
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
