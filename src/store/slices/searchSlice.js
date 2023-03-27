import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeName } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
