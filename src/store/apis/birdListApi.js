import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const birdListApi = createApi({
  reducerPath: "birdList",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchBirds: builder.query({
        query: () => "/birds",
      }),
    };
  },
});

export const { useFetchBirdsQuery } = birdListApi;
export { birdListApi };
