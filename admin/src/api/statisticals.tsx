import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const statisticalsApi = createApi({
  reducerPath: "statisticals",
  tagTypes: ["statisticals"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/',
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    statisticals: builder.mutation({
      query: (data: any) => ({
        url: `statisticals`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['statisticals']
    }),
  }),
});

export const {
    useStatisticalsMutation
} = statisticalsApi;
export default statisticalsApi;
