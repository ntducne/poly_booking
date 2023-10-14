import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const roomApi = createApi({
    reducerPath: "room",
    tagTypes: ['room'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRooms: builder.query<any, any>({
            query: () => `/admin/rooms`,
            providesTags: ['room']
        }),
        createRoom: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/rooms`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['room']
        }),
        getDetailRoom: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/rooms/${id}`,
                method: "GET"
            }),
            providesTags: ['room']
        }),
        updateRoom: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/rooms/${data.id}`,
                    method: "PUT",
                    body: data.data
                }
            },
            invalidatesTags: ['room']
        }),
    })
})

export const { useGetRoomsQuery, useCreateRoomMutation, useGetDetailRoomQuery, useUpdateRoomMutation } = roomApi
export const roomReducer = roomApi.reducer
export default roomApi