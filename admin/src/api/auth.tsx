import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ILogin {
    email: string,
    password: string
}

const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: ILogin) => ({
                url: `/auth/admin/login`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        
    })
})


export const { useLoginMutation} = authApi
export const authReducer = authApi.reducer
export default authApi
