import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../../config/cookies";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.polydevhotel.site/admin",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2]}`)
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
    
  }),

});


export const { useGetAllUsersQuery } = usersApi;
