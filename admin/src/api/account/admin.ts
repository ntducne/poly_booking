import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../../config/cookies";

export const adminsApi = createApi({
  reducerPath: "admins",
  tagTypes: ["Admins"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
    getDetailAdmins: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
    createAdmins: builder.mutation({
      query: (data) => ({
        url: `/store`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),

    updateAdmins: builder.mutation({
      query: (data) => ({
        url: `/update/${data.idStaff}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Admins"],
    }),

    deleteAdmins: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
    
    assignPermission: builder.mutation({
      query: (data) => ({
        url: `/assignPermission/${data.idStaff}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetDetailAdminsQuery,
  useCreateAdminsMutation,
  useUpdateAdminsMutation,
  useDeleteAdminsMutation,
  useAssignPermissionMutation,
} = adminsApi;
