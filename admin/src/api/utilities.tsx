import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const utilitiesApi = createApi({
    reducerPath: "utilities",
    tagTypes: ['Utilities'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUtilitie: builder.query<any, any>({
            // query: (query) => `admin/rooms/types?page=${query.page || 1}`,
            query: () => `/admin/utilities`,
            providesTags: ['Utilities']
        }),
        createUtilitie: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/utilities`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Utilities']
        }),
        getDetailUtilitie: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/utilities/${id}`,
                method: "GET"
            }),
            providesTags: ['Utilities']
        }),
        // updateUtilitie: builder.mutation<any, any>({
        //     query: (data) => {
        //         return {
        //             url: `/admin/utilities/${data.id}`,
        //             method: "PUT",
        //             body: data
        //         }
        //     },
        //     invalidatesTags: ['Utilities']
        // }),

        // deleteUtilitie: builder.mutation<any, any>({
        //     query: (id: string) => {
        //         return {
        //             url: `/admin/utilities/${id}`,
        //             method: "DELETE",
        //         }
        //     },
        //     invalidatesTags: ['Utilities']
        // }),
    })
})

export const { useGetUtilitieQuery, useCreateUtilitieMutation } = utilitiesApi
export const roomReducer = utilitiesApi.reducer
export default utilitiesApi