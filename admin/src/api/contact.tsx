import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["contact"],
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
    getContact: builder.query<any, any>({
      query: () => `contact`,
      providesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
} = contactApi;
export default contactApi;
