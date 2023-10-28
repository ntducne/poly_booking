import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const ratesApi = createApi({
  reducerPath: "rate",
  tagTypes: ["rate"],
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
    getRates: builder.query<any, any>({
      query: () => `rate`,
      providesTags: ["rate"],
    }),
  }),
});

export const {
  useGetRatesQuery,
} = ratesApi;
export default ratesApi;
