import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const branchApi = createApi({
    reducerPath: "branches",
    tagTypes: ['Branches'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_CLIENT,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)
            console.log('Header');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBranches: builder.query<any, any>({
            query: () => {
                return ({
                    method: 'GET',
                    url: "/branch"
                })
            },
            providesTags: ["Branches"]
        })
    })
})

export const { useGetBranchesQuery } = branchApi
export default branchApi