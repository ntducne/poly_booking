import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ILogin {
    email: string,
    password: string
}

const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API_AUTH,
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: ILogin) => ({
                url: `/login`,
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
