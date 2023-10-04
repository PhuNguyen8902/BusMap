import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const stationsSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setStations: (state, action) => {
      return action.payload; // Update stations data with payload
    },
  },
});

export const { setStations } = stationsSlice.actions;

export default stationsSlice.reducer;