import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, changeName, changeNumber } from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export { store, changeName, changeNumber };
