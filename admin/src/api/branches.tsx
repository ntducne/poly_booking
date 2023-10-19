import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const branchApi = createApi({
    reducerPath: "branches",
    tagTypes: ['branches'],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllBranches: builder.query<any, any>({
            query: () => `/admin/branches`,
            providesTags: ['branches']
        }),

        createBranches: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/branches`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['branches']
        }),

        getDetailBranches: builder.query<any, any>({
            query: (_id) => ({
                url: `/admin/branches/${_id}`,
                method: "GET"
            }),
            providesTags: ['branches']
        }),

        updateBranches: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/branches/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['branches']
        }),

        deleteBranch: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/branches/${data.id}`,
                    method: "DELETE",
                    body: data.data
                }
            },
            invalidatesTags: ['branches']
        }),
    })
})

export const { useGetAllBranchesQuery, useCreateBranchesMutation, useGetDetailBranchesQuery, useUpdateBranchesMutation, useDeleteBranchMutation } = branchApi
export const roomReducer = branchApi.reducer
export default branchApi