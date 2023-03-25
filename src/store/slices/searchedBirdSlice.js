import { createSlice } from "@reduxjs/toolkit";

const searchedBirdSlice = createSlice({
  name: "searchedBird",
  initialState: {
    data: [],
  },
  reducers: {},
});

export const searchedBirdReducer = searchedBirdSlice.reducer;
