import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "../config/cookies";
// import { cookies } from '../config/cookies';

const roomApi = createApi({
  reducerPath: "Room",
  tagTypes: ["rooms"],
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
    getRooms: builder.query<any, any>({
      query: () => `rooms`,
      providesTags: ["rooms"],
    }),
    createRoom: builder.mutation<any, any>({
      query: (data) => ({
        url: `rooms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rooms"],
    }),
    getDetailRoom: builder.query<any, any>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "GET",
      }),
      providesTags: ["rooms"],
    }),
    updateRoom: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `rooms/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["rooms"],
    }),
    deleteRoom: builder.mutation<any, any>({
      query: (id: string) => {
        return {
          url: `rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rooms"],
    }),
    deleteImgRoom: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `rooms/deleteImage`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rooms"],
    }),
    updateImgRoom: builder.mutation<any, any>({
      query: (data) => {
        const formUpload = new FormData();
        for (let i = 0; i < data.images.length; i++) {
          formUpload.append("images[]", data.images[i]);
        }
        return {
          url: `rooms/updateImage/${data.id}`,
          method: "POST",
          body: formUpload,
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});
export const {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useGetDetailRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useDeleteImgRoomMutation,
  useUpdateImgRoomMutation,
} = roomApi;
export const roomReducer = roomApi.reducer;
export default roomApi;
