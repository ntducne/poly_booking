import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const permissonApi = createApi({
  reducerPath: "permission",
  tagTypes: ["permission"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API_PERMISSION,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPermisson: builder.query<any, any>({
      query: () => `/permission`,
      providesTags: ["permission"],
    }),
  }),
});

export const {
  useGetPermissonQuery
} = permissonApi;
export default permissonApi;
