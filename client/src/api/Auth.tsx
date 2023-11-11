import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useCookies } from 'react-cookie';

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

interface IResetPassword {
    token: string;
    data: {
        old_password: string;
        new_password: string;
        new_password_confirmation: string
    }
}


const authApi = createApi({
    reducerPath: 'auth',
    tagTypes: ['Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API,
        prepareHeaders: (headers) => {
            // const [cookie] = useCookies(['userInfo']);
            // if (cookie.userInfo) {

            //     // localStorage.getItem("access_token");
            //     const token = cookie.userInfo.accessToken.token;
            //     headers.set("authorization", `Bearer ${token}`)
            //     return headers;
            // }
            const token = localStorage.getItem("access_token");
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
        updateUser: builder.mutation({
            query: (data: ILogin) => ({
                url: `/user/update/profile`,
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
            query: (token) => ({
                url: `/auth/user/reset-password/${token}`,
                method: "GET",
            }),
        }),

        getUser: builder.query({
            query: () => ({
                url: `/user/profile`,
                method: "GET",
            }),
        }),
        resetPassword: builder.mutation({
            query: (data: IResetPassword) => ({
                url: `/auth/user/reset-password/${data.token}`,
                method: 'PUT',
                body: data.data,
            }),
            invalidatesTags: ['Auth']
        }),
    })
})


export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useGetTokenQuery, useResetPasswordMutation, useGetUserQuery } = authApi;
export const authReducer = authApi.reducer
export default authApi