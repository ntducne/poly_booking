import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  token: string;
  data: {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
  };
}

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_AUTH,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILogin) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (data: IRegister) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation({
      query: (data: IForgotPassword) => ({
        url: `/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getToken: builder.query({
      query: (token) => ({
        url: `/reset-password/${token}`,
        method: "GET",
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: IResetPassword) => ({
        url: `/reset-password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useGetTokenQuery,
  useResetPasswordMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
