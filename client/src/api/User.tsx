import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCookies } from 'react-cookie';


const userApi = createApi({
    reducerPath: "Users",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_URL_API + '/user/',
        prepareHeaders: (headers) => {
            const [cookies] = useCookies(['userInfo']);
            const token = cookies.userInfo?.accessToken?.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        
        getProfile: builder.query<any, any>({
            query: () => `profile`,
            providesTags: ["User"],
        }),

        updateAvatar: builder.mutation({
            query: (data) => ({
                url: `update/avatar`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `update/profile`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        updatePassword: builder.mutation({
            query: (data) => ({
                url: `update/password`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        getHistoryBooking: builder.query<any, any>({
            query: () => `booking/history`,
            providesTags: ["User"],
        }),

        getDetailHistoryBooking: builder.query<any, any>({
            query: (id) => `booking/history/${id}`,
            providesTags: ["User"],
        }),

        cancelBooking: builder.mutation({
            query: (id) => ({
                url: `booking/cancel/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["User"],
        }),

        processReview: builder.mutation({
            query: (data) => ({
                url: `rate`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        processLogout: builder.query<any, any>({
            query: () => `logout`,
            providesTags: ["User"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateAvatarMutation,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useGetHistoryBookingQuery,
    useGetDetailHistoryBookingQuery,
    useCancelBookingMutation,
    useProcessReviewMutation,
    useProcessLogoutQuery,
} = userApi;

export const userReducer = userApi.reducer;
export default userApi;
