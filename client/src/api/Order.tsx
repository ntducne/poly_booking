import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "Orders",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_CLIENT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchOrders: builder.mutation<any, any>({
      query: (data: { billing_id: string }) => {
        return {
          method: "POST",
          url: "/booking/check",
          body: data,
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useSearchOrdersMutation } = orderApi;

export const orderReducer = orderApi.reducer;
export default orderApi;
