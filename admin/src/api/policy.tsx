import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const policyApi = createApi({
    reducerPath: "policy",
    tagTypes: ['policys'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API + '/',
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllPolicy: builder.query<any, any>({
            query: () => `policies`,
            providesTags: ['policys']
        }),

        createPolicy: builder.mutation<any, any>({
            query: (data) => ({
                url: `policies`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['policys']
        }),

        getDetailPolicy: builder.query<any, any>({
            query: (id) => ({
                url: `policies/${id}`,
                method: "GET"
            }),
            providesTags: ['policys']
        }),

        updatePolicy: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `policies/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['policys']
        }),

        deletePolicy: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `policies/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['policys']
        }),
    })
})

export const { useGetAllPolicyQuery, useCreatePolicyMutation, useGetDetailPolicyQuery, useUpdatePolicyMutation, useDeletePolicyMutation } = policyApi
export const roomReducer = policyApi.reducer
export default policyApi