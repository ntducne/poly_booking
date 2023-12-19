import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../../config/cookies";

export const profileApi = createApi({
    reducerPath: "profile",
    tagTypes: ["Profile"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${JSON.parse(cookies().Get("AuthUser") as any)[2].token}`
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/update/profile`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
        updateProfileImage: builder.mutation({
            query: (data) => ({
                url: `/update/avatar`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: `/update/password`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),

    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useUpdateProfileImageMutation
} = profileApi;
