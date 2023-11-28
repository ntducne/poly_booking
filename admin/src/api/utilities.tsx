import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const utilitiesApi = createApi({
    reducerPath: "utilitie",
    tagTypes: ['Utilities'],
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://api.polydevhotel.site",
        baseUrl: import.meta.env.VITE_URL_API + '/',
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllUtilitie: builder.query<any, any>({
            // query: (query) => `admin/rooms/types?page=${query.page || 1}`,
            query: () => `utilities`,
            providesTags: ['Utilities']
        }),
        createUtilitie: builder.mutation<any, any>({
            query: (data) => ({
                url: `utilities`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Utilities']
        }),
        getDetailUtilitie: builder.query<any, any>({
            query: (id) => ({
                url: `utilities/${id}`,
                method: "GET"
            }),
            providesTags: ['Utilities']
        }),
        updateUtilitie: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `utilities/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['Utilities']
        }),

        deleteUtilitie: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `utilities/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Utilities']
        }),
    })
})

export const { useGetAllUtilitieQuery, useCreateUtilitieMutation, useGetDetailUtilitieQuery, useUpdateUtilitieMutation, useDeleteUtilitieMutation } = utilitiesApi
export const roomReducer = utilitiesApi.reducer
export default utilitiesApi