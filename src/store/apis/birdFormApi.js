import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const birdFormApi = createApi({
  reducerPath: "birdForm",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      updateBirdSearched: builder.mutation({
        query: ({ name, patch }) => ({
          url: `/birdSearched/${name}`,
          method: "PATCH",
          body: patch,
        }),
      }),
    };
  },
});

export const { useUpdateBirdSearchedMutation } = birdFormApi;
export { birdFormApi };
