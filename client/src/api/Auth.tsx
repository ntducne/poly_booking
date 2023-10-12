import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ILogin {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    confirmPassword: string,
    name: string
}

interface IForgotPassword {
    email: string;
}


const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API,
        prepareHeaders: (headers) => {
            // localStorage.getItem("access_token");
            const token = Object.fromEntries(new URLSearchParams(document.cookie));
            headers.set("authorization", `Bearer ${token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: ILogin) => ({
                url: `/auth/user/login`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        register: builder.mutation({
            query: (data: IRegister) => ({
                url: `/auth/user/register`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        forgotPassword: builder.mutation({
            query: (data: IForgotPassword) => ({
                url: `/auth/user/reset-password`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        getToken: builder.query({
            query: () => ({
                url: `/auth/user/reset-password/{token}`,
                method: "GET",
            }),
        }),
    })
})


export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useGetTokenQuery } = authApi;
export const authReducer = authApi.reducer
export default authApi