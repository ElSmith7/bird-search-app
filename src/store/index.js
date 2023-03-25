import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { birdFormApi } from "./apis/birdFormApi";

export const store = configureStore({
  reducer: {
    [birdFormApi.reducerPath]: birdFormApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(birdFormApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useUpdateBirdSearchedMutation } from "./apis/birdFormApi";
