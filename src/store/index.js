import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { searchReducer, changeName, changeNumber } from "./slices/searchSlice";
import { birdListApi } from "./apis/birdListApi";

const store = configureStore({
  reducer: {
    search: searchReducer,
    [birdListApi.reducerPath]: birdListApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(birdListApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, changeName, changeNumber } from "./slices/searchSlice";
export { useFetchBirds } from "./apis/birdListApi";
