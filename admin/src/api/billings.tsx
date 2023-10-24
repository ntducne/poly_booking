import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const billingApi = createApi({
  reducerPath: "billings",
  tagTypes: ["billings"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.polydevhotel.site/admin/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBilings: builder.query<any, any>({
      query: () => `billings`,
      providesTags: ["billings"],
    }),
    getDetailBilings: builder.query<any, any>({
      query: (id) => ({
        url: `billings/${id}`,
        method: "GET",
      }),
      providesTags: ["billings"],
    }),
  }),
});

export const {
  useGetBilingsQuery,
  useGetDetailBilingsQuery,
} = billingApi;
export default billingApi;
