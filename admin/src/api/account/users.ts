import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../../config/cookies";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getDetailUsers: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      query: (data) => ({
        url: `/users/${data?.id}`,
        method: "PUT",
        body: data.data
      }),
      invalidatesTags: ["Users"],
    }),

  }),

});


export const { useGetAllUsersQuery , useGetDetailUsersQuery , useUpdateUsersMutation } = usersApi;
