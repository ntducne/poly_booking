import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.polydevhotel.site/admin",
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2NTI1NjdiMzBlZDFjYzQ5OTQwYTM1MzIiLCJqdGkiOiI2MjZjNDhkY2M2ZjlhZDlkNzA4OWU2NmQzMTk2YzAxZDQxNjI1NDQ0OGVhZWE4NWYyOGY2YjdhYjVlNGNjZDgzNTM3MjFjZDZhOGRhMTBmMiIsImlhdCI6MTY5NzAwOTE5NC44NDI4MzgsIm5iZiI6MTY5NzAwOTE5NC44NDI4NDEsImV4cCI6MTcyODYzMTU5NC44MDY3OTcsInN1YiI6IjY1MjJjOGI5MjVmNjlhZTI1NTAyZTA4NCIsInNjb3BlcyI6WyJhZG1pbiJdfQ.wViAsXqrlXdjBP3GDG4t3OoPrNu_T8p0LzdLoL5JbVBjxTVu3irAe4Hn6cb1-9hQ9qqOwzQMD0rp0WOLX9MyfCIx02kzRc6kriilvPKrkb7G2satky0IYbo3OVN77KdIt3dJkykIxrR-tbm5t_wd_tIM_TW31kDIUh471g16C1o1iZ21WepHnYXDONiZ28icV4hhbD8GD5xW11zKuBvz_3wh87g4PT9onEIM8dbFVOCyUQ3IH-fMg7GbYKRMO426xJ90gl4RdsKUztS_aN8cc-vtQlWWfzB7Lb6_essS_ZeCNqBESTRCP-zzHk0OLW00fJ8COJgkEChIJiIcFQUb5nI4668uPP47oUVMF9SYFY559nWJ6chyP36zsyNPzuNZu7039ZPbdd9LmJ4nt5j9AyV91lBs22LLGfXzKabHm3zvv-ZVrYjmu-dqEKTVJqJ3ZFxTF5YzxGz6cYinjVntkHN7kPOIi-rIRfnY_rj9n5oDUey_WyTvL9O9RhCG8B4IdTy3Ng9gHsDXz_gpmgQSMOsZYapwH0QAwxNERLMTM95j5xMMCiwRqfkqjNzM6Wjfe4VvrUJIk_GCWXwMd9OXjwQFJbgnf__FJjNIJaLOHV-3O7a6zyQRH2rD5DkexIBUYmZUfLQNLctlqbwHx1itmDNsC5cSoFGCRJiVS6dPXhU`)
    }
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    
  }),

});


export const { useGetAllUsersQuery } = usersApi;
