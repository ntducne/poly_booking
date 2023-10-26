import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const policyApi = createApi({
    reducerPath: "policy",
    tagTypes: ['Policy'],
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
            providesTags: ['Policy']
        }),

        createPolicy: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/policies`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Policy']
        }),

        getDetailPolicy: builder.query<any, any>({
            query: (id) => ({
                url: `/admin/policies/${id}`,
                method: "GET"
            }),
            providesTags: ['Policy']
        }),

        updatePolicy: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/policies/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['Policy']
        }),

        deletePolicy: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `/admin/policies/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Policy']
        }),
    })
})

export const { useGetAllPolicyQuery, useCreatePolicyMutation, useGetDetailPolicyQuery, useUpdatePolicyMutation, useDeletePolicyMutation } = policyApi
export const roomReducer = policyApi.reducer
export default policyApi