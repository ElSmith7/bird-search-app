import { configureStore } from "@reduxjs/toolkit";
import { searchedBirdReducer } from "./slices/searchedBirdSlice";

export const store = configureStore({
  reducer: {
    searchedBird: searchedBirdReducer,
  },
});
