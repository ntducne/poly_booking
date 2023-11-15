import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const roomApi = createApi({
    reducerPath: "rooms",
    tagTypes: ['Rooms'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)                                                         
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRooms: builder.query<any, any>({
            query: (data: any) => {
                const keys = Object.keys(data);
                const url = keys.length === 0 ? `/client/room` : `/client/room/search?checkin=${data.checkin}&checkout=${data.checkout}&adult=${data.adult}&child=${data.child}&branch_id=${data.branch_id}&soLuong=${data.soLuong}`
                return ({
                    method: 'GET',
                    url: url
                })
            },
            providesTags: ["Rooms"]
        }),
        getDetial: builder.query<any, any>({
            query: (slug) => `/client/room/${slug}`,
            providesTags: ["Rooms"]
        }),
        postBooking: builder.mutation({
            query: (data: any) => ({
                url: `client/room/booking`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Rooms']
        }),
    })
})

<<<<<<< HEAD
export const { useGetRoomsQuery, useGetDetialQuery, usePostBookingMutation } = roomApi
=======
export const {useGetRoomsQuery, useGetDetialQuery,usePostBookingMutation} = roomApi
>>>>>>> 4149fc4b9dfce7676b2a63efe070766b61b86149
export const roomReducer = roomApi.reducer
export default roomApi