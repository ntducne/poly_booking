import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../config/cookies';

const roomTypesApi = createApi({
    reducerPath: "roomType",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.polydevhotel.site",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${JSON.parse(cookies().Get('AuthUser') as any)[2].token}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRoomType: builder.query<any, any>({
            query: () => `/admin/types-rooms`
        })
    })
})

export const { useGetRoomTypeQuery } = roomTypesApi
export const roomReducer = roomTypesApi.reducer
export default roomTypesApi