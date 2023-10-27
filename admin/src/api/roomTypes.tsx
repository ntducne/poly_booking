import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const roomTypesApi = createApi({
    reducerPath: "roomType",
    tagTypes: ['RoomType'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRoomType: builder.query<any, any>({
            // query: (query) => `admin/rooms/types?page=${query.page || 1}`,
            query: () => `/admin/rooms/types`,
            providesTags: ['RoomType']
        }),
        createRoomType: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/rooms/types`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['RoomType']
        }),
        getDetailRoomType: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/rooms/types/${id}`,
                method: "GET"
            }),
            providesTags: ['RoomType']
        }),
        updateRoomType: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/rooms/types/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['RoomType']
        }),

        deleteRoomType: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `/admin/rooms/types/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['RoomType']
        }),
    })
})

export const { useGetRoomTypeQuery, useCreateRoomTypeMutation, useGetDetailRoomTypeQuery, useUpdateRoomTypeMutation, useDeleteRoomTypeMutation } = roomTypesApi
export const roomReducer = roomTypesApi.reducer
export default roomTypesApi