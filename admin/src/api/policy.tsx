import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const policyApi = createApi({
    reducerPath: "policy",
    tagTypes: ['policys'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllPolicy: builder.query<any, any>({
            query: () => `/admin/policies`,
            providesTags: ['policys']
        }),

        createPolicy: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/policies`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['policys']
        }),

        getDetailPolicy: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/policies/${id}`,
                method: "GET"
            }),
            providesTags: ['policys']
        }),

        updatePolicy: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/policies/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['policys']
        }),

        deletePolicy: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `/admin/policies/${id}`,
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