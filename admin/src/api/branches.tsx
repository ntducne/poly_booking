import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const branchApi = createApi({
    reducerPath: "branches",
    tagTypes: ['Branches'],
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
            providesTags: ['Branches']
        }),

        createBranches: builder.mutation<any, any>({
            query: (data) => ({
                url: `/admin/branches`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Branches']
        }),

        getDetailBranches: builder.query<any, any>({
            query: (_id) => ({
                url: `/admin/branches/${_id}`,
                method: "GET"
            }),
            providesTags: ['Branches']
        }),

        updateBranches: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `/admin/branches/${data.id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ['Branches']
        }),

        deleteBranch: builder.mutation<any, any>({
            query: (id: string) => {
                return {
                    url: `/admin/branches/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ['Branches']
        }),
    })
})

export const { useGetAllBranchesQuery, useCreateBranchesMutation, useGetDetailBranchesQuery, useUpdateBranchesMutation, useDeleteBranchMutation } = branchApi
export const roomReducer = branchApi.reducer
export default branchApi