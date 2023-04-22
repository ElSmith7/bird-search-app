import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";

const birdListApi = createApi({
  reducerPath: "birdList",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  tagTypes: ["Bird"],
  endpoints(builder) {
    return {
      fetchBirds: builder.query({
        providesTags: ["Bird"],
        query: () => "/birds",
      }),
      addBird: builder.mutation({
        invalidatesTags: ["Bird"],
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
        invalidatesTags: ["Bird"],
        query: (bird) => {
          return {
            url: `/birds/${bird.id}`,
            method: "DELETE",
          };
        },
      }),
      updateSightings: builder.mutation({
        query: ({ bird, sightings }) => {
          return {
            url: `/birds/${bird.id}`,
            method: "PATCH",
            body: { number: sightings },
          };
        },
      }),
    };
  },
});

export const {
  useFetchBirdsQuery,
  useAddBirdMutation,
  useRemoveBirdMutation,
  useUpdateSightingsMutation,
} = birdListApi;
export { birdListApi };
