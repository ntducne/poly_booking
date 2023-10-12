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
        })
    })
})

export const {useGetRoomsQuery, useGetDetialQuery} = roomApi
export const roomReducer = roomApi.reducer
export default roomApi