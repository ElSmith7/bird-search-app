import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";

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
      addBird: builder.mutation({
        query: ({ name, number }) => {
          return {
            url: "/birds",
            method: "POST",
            body: {
              id: nanoid(),
              name: name,
              number: number,
            },
          };
        },
      }),
      removeBird: builder.mutation({
        query: (bird) => {
          return {
            url: `/birds/${bird.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useFetchBirdsQuery, useAddBirdMutation, useRemoveBirdMutation } =
  birdListApi;
export { birdListApi };
