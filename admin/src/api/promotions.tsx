import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const promotionsApi = createApi({
    reducerPath: "promotions",
    tagTypes: ['promotions'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site/admin/",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPromotions: builder.query<any, any>({
            query: () => `promotions`,
            providesTags: ['promotions']
        }),
        createPromotions: builder.mutation<any, any>({
            query: (data) => ({
                url: `promotions`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['promotions']
        }),
        getDetailPromotions: builder.query<any, any>({
            query: (id) => ({
                url: `promotions/${id}`,
                method: "GET"
            }),
            providesTags: ['promotions']
        }),
        updatePromotions: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `promotions/${data.id}`,
                    method: "PUT",
                    body: data.data
                }
            },
            invalidatesTags: ['promotions']
        }),
        deletePromotions: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `promotions/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['promotions']
        }),
    })
})

export const { useCreatePromotionsMutation, useGetDetailPromotionsQuery, useGetPromotionsQuery , useUpdatePromotionsMutation , useDeletePromotionsMutation } = promotionsApi
export const roomReducer = promotionsApi.reducer
export default promotionsApi