import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clientApi = createApi({
    reducerPath: "Clients",
    tagTypes: ["Clients"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API + '/client/',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: (builder) => ({

        getBranch: builder.query<any, any>({
            query: () => `branch`,
            providesTags: ["Clients"],
        }),

        getRooms: builder.query<any, any>({
            query: (data: any) => {
                const keys = Object.keys(data);
                const url =
                    keys.length === 0
                        ? `/client/room`
                        : `/client/room/search?checkin=${data.checkin}&checkout=${data.checkout}&adult=${data.adult}&child=${data.child}&branch_id=${data.branch_id}&soLuong=${data.soLuong}`;
                return {
                    method: "GET",
                    url: url,
                };
            },
            providesTags: ["Clients"],
        }),

        getDetailRoom: builder.query<any, any>({
            query: (slug) => `room/${slug}`,
            providesTags: ["Clients"],
        }),

        getRoomType: builder.query<any, any>({
            query: () => `room/type`,
            providesTags: ["Clients"],
        }),

        handleBooking: builder.mutation({
            query: (data) => ({
                url: `room/booking`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Clients"],
        }),
    }),
});

export const {
    useGetBranchQuery,
    useGetRoomsQuery,
    useGetDetailRoomQuery,
    useGetRoomTypeQuery,
    useHandleBookingMutation,
} = clientApi;

export const userReducer = clientApi.reducer;
export default clientApi;
