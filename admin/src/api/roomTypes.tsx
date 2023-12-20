import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const roomTypesApi = createApi({
    reducerPath: "roomType",
    tagTypes: ['RoomType'],
    baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/',
    // baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllRoomType: builder.query<any, any>({
            query: () => `rooms/types?page=all`,
            providesTags: ['RoomType']
        }),
        getRoomType: builder.query<any, any>({
            query: (query) => `rooms/types?page=${query.page}`,
            // query: () => `rooms/types`,
            providesTags: ['RoomType']
        }),

        createRoomType: builder.mutation<any, any>({
            query: (data) => ({
                url: `rooms/types`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['RoomType']
        }),
        getDetailRoomType: builder.query<any, any>({
            query: (id) => ({
                url: `rooms/types/${id}`,
                method: "GET"
            }),
            providesTags: ['RoomType']
        }),
        updateRoomType: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `rooms/types/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['RoomType']
        }),

        deleteRoomType: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `rooms/types/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['RoomType']
        }),
    })
})

export const { useGetAllRoomTypeQuery, useGetRoomTypeQuery, useCreateRoomTypeMutation, useGetDetailRoomTypeQuery, useUpdateRoomTypeMutation, useDeleteRoomTypeMutation } = roomTypesApi
export const roomReducer = roomTypesApi.reducer
export default roomTypesApi