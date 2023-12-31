import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../../config/cookies";

export const staffsApi = createApi({
  reducerPath: "staffs",
  tagTypes: ["Staffs"],
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
    getAllStaffs: builder.query({
      query: (body) => ({
        url: `/staffs?page=${body?.page}`,
        method: "GET",
      }),
      providesTags: ["Staffs"],
    }),
    getDetailStaffs: builder.query({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "GET",
      }),
      providesTags: ["Staffs"],
    }),
    createStaffs: builder.mutation({
      query: (data) => ({
        url: `/staffs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staffs"],
    }),
    updateStaffs: builder.mutation({
      query: (data) => ({
        url: `/staffs/${data.idStaff}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Staffs"],
    }),
    
    assignPermission: builder.mutation({
      query: (data) => ({
        url: `/staffs/assignPermission/${data.idStaff}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["Staffs"],
    }),
  }),
});

export const {
  useGetAllStaffsQuery,
  useGetDetailStaffsQuery,
  useCreateStaffsMutation,
  useUpdateStaffsMutation,
  useAssignPermissionMutation,
} = staffsApi;
