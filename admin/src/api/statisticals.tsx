import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const statisticalsApi = createApi({
  reducerPath: "statisticals",
  tagTypes: ["statisticals"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + "/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    statisticals: builder.query({
      query: (data: any) => {
        const keys = Object.keys(data);
        const queryParams = keys
          .map((key: any) => {
            if (Array.isArray(data[key])) {
              return data[key].map((item: any) => `${key}[]=${item}`).join("&");
            } else {
              return `${key}=${data[key]}`;
            }
          })
          .join("&");
        const url = `/statisticals${queryParams ? `?${queryParams}` : ""}`;
        console.log("url: " + url);

        return {
          method: "GET",
          url: url,
        };
      },
      providesTags: ["statisticals"],
    }),
    statisticalsChart: builder.query({
      query: () => `chart`,
      providesTags: ["statisticals"],
    }),
  }),
});

export const { useStatisticalsQuery , useStatisticalsChartQuery } = statisticalsApi;
export default statisticalsApi;
