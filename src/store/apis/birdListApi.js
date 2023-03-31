import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const birdListApi = createApi({
  reducerPath: "birdList",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    endpoints(builder) {
      return {
        fetchBirds: builder.query({
          query: () => {
            return {
              url: "/birds",
              method: "GET",
            };
          },
        }),
      };
    },
  }),
});

export const { useFetchBirdsQuery } = birdListApi;
export { birdListApi };
