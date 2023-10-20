import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { cookies } from '../config/cookies';

const roomApi = createApi({
    reducerPath: "room",
    tagTypes: ['Rooms'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2NTI1NjdiMzBlZDFjYzQ5OTQwYTM1MzIiLCJqdGkiOiJlMjM0NGViYjZmNmFlMjI3ZjAwN2FiZjc2NjhmZTdiOTExYjM3ODIzNTdlYjIxYTQ3NmFlMmUxN2Q0MWVlM2I4YTc4ZGU1YjhmNzc2NDNiYSIsImlhdCI6MTY5NzcyNDYwOC45MzE1NzcsIm5iZiI6MTY5NzcyNDYwOC45MzE1OCwiZXhwIjoxNzI5MzQ3MDA4Ljg5NTY4OSwic3ViIjoiNjUyZTgzYmQ0ZjIxYTAxZWNkYTM2ZmRlIiwic2NvcGVzIjpbImFkbWluIl19.skgtMuRX54SIYEc5CYWOyH04gjUiO6l6k1Do9Cnl5M-M_2QEvrNQx1UWqJZ6-PSKXyHpE_IjXgydd6ijf3OL5gG7nA7IaaHzS31cb73r7ldgwSMs8UvcJvCPeTqrnxJWcpdOkGu7-0ndBuYdU7cQ7TQwdGoTW62jTuxbcbvCpFxsxlY3fB-dfHONCqwOS7xKevFPJM0Kk3lac_7yFWo44EcAZZUTXlxsap3RY0YOBdju-bDmd08JGlEdQmKkuF15zm3mEWCac82KMX2psFv0OtmV596W7gUbqHM5oACBdarvNHpeigMYBadoDfdMX6mBVztOpiKJpfKAfeAXTHQlqGWwIAyHyMFT0y-w2KMJYgf83s1twWLtsFWIWnAeXJPmeEX7ZXcbUDdgC3BPAlZVgcQPYqm28v6NNafRq7VeVuCfTvKWtRuXZ3142Z9CXvkZL1s5_gTHqYe6BKnB_CzceG94ZL0CHnaS-r1iffxplve5-Ji0Ozra8Hido8nRmijTvTJfO3jIMBgj1w8xMu8Ie65ApUywTbQ29ty9RbtO2SqLKkbEydJD6GFOQBUKVKQxgYW3nAVlSyxlBLVLCA_NGHQkJAsF8ne6y8zF8b2WsVsw11uouVSjgHEPIvAyCKXeDSPP-gBoq3JufNj9oBJuYTIrWvG_7Fk_PBcF0wF0iL8`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRooms: builder.query<any, any>({
            query: () => `/admin/rooms`,
            providesTags: ['Rooms']
        }),
        createRoom: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/rooms`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Rooms']
        }),
        getDetailRoom: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/rooms/${id}`,
                method: "GET"
            }),
            providesTags: ['Rooms']
        }),
        updateRoom: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/rooms/${data.id}`,
                    method: "PUT",
                    body: data.data
                }
            },
            invalidatesTags: ['Rooms']
        }),
        deleteRoom: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `/admin/rooms/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ['Rooms']
        }),
    })
})

export const { useGetRoomsQuery, useCreateRoomMutation, useGetDetailRoomQuery, useUpdateRoomMutation, useDeleteRoomMutation } = roomApi
export const roomReducer = roomApi.reducer
export default roomApi