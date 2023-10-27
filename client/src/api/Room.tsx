import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const roomApi = createApi({
    reducerPath: "room",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)
            // modify header theo từng request
            return headers;
        },
    }),
    endpoints: (builder) =>({
        getRooms: builder.query<any, any>({
            query: () => `/client/room`
        }),
        getDetial: builder.query<any, any>({
            query: (id) => `/client/room/${id}`
        }),
        postBooking: builder.mutation({
            query: (data: any) => ({
                url: `client/room/booking`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Booking']
        }),
    })
})

export const {useGetRoomsQuery, useGetDetialQuery,usePostBookingQuery} = roomApi
export const roomReducer = roomApi.reducer
export default roomApi