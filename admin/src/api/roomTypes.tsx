import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const roomTypesApi = createApi({
    reducerPath: "roomType",
    tagTypes: ['roomType'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRoomType: builder.query<any, any>({
            query: (query) => `/admin/types-rooms?page=${query.page || 1}`,
            // query: () => `/admin/types-rooms`,
            providesTags: ['roomType']
        }),
        createRoomType: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/types-rooms`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['roomType']
        }),
        getDetailRoomType: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/types-rooms/${id}`,
                method: "GET"
            }),
            providesTags: ['roomType']
        }),
        updateRoomType: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/types-rooms/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['roomType']
        }),
    })
})

export const { useGetRoomTypeQuery, useCreateRoomTypeMutation, useGetDetailRoomTypeQuery, useUpdateRoomTypeMutation } = roomTypesApi
export const roomReducer = roomTypesApi.reducer
export default roomTypesApi