import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const ratesApi = createApi({
  reducerPath: "rates",
  tagTypes: ["rates"],
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
    getRates: builder.query<any, any>({
      query: (page) => `rates?page=${page}`,
      providesTags: ["rates"],
    }),
  }),
});

export const {
  useGetRatesQuery,
} = ratesApi;
export default ratesApi;
