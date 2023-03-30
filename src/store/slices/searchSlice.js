import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { name: "", number: 0 },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeNumber(state, action) {
      state.number = action.payload;
    },
  },
});

export const { changeName, changeNumber } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
