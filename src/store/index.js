import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, changeName } from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export { store, changeName };
