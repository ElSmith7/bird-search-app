import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { searchReducer, changeName, changeNumber } from "./slices/searchSlice";
import { birdListApi } from "./apis/birdListApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [birdListApi.reducerPath]: birdListApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(birdListApi.middleware);
  },
});

setupListeners(store.dispatch);

export { changeName, changeNumber };
export {
  useFetchBirdsQuery,
  useAddBirdMutation,
  useRemoveBirdMutation,
  useUpdateSightingsMutation,
} from "./apis/birdListApi";
