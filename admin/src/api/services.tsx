import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const serviceApi = createApi({
    reducerPath: "service",
    tagTypes: ['service'],
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://api.polydevhotel.site/admin/",
        baseUrl: import.meta.env.VITE_URL_API + '/',
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getServices: builder.query<any, any>({
            query: () => `services`,
            providesTags: ['service']
        }),
        createServices: builder.mutation<any, any>({
            query: (data) => ({
                url: `services`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['service']
        }),
        getDetailServices: builder.query<any, any>({
            query: (id) => ({
                url: `services/${id}`,
                method: "GET"
            }),
            providesTags: ['service']
        }),
        updateServices: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `services/${data.id}`,
                    method: "PUT",
                    body: data.data
                }
            },
            invalidatesTags: ['service']
        }),
        deleteServices: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `services/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['service']
        }),
    })
})

export const { useGetServicesQuery , useGetDetailServicesQuery , useCreateServicesMutation  , useUpdateServicesMutation , useDeleteServicesMutation } = serviceApi
export default serviceApi