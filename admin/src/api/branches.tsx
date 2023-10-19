import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const branchApi = createApi({
    reducerPath: "branches",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllBranches: builder.query<any, any>({
            query: () => `/admin/branches`
        })
    })
})

export const { useGetAllBranchesQuery } = branchApi
export const roomReducer = branchApi.reducer
export default branchApi