import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";

const notificationsApi = createApi({
  reducerPath: "notifications",
  tagTypes: ["notifications"],
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
    getNotifications: builder.query<any, any>({
      query: () => `notifications`,
      providesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
} = notificationsApi;
export default notificationsApi;
