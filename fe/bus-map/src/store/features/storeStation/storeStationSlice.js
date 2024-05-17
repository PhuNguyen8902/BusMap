import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stationsOneRoute: [],
  stationsTwoRoute: [],
  stationsThreeRoute: [],
  startLocation: {},
  destination: {},
};

export const storeStationsOneRouteSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    // action
    storeStationsOneRoute: (state, action) => {
      state.stationsOneRoute = action.payload;
    },
    storeStationsTwoRoute: (state, action) => {
      state.stationsTwoRoute = action.payload;
    },
    storeStationsThreeRoute: (state, action) => {
      state.stationsThreeRoute = action.payload;
    },
    storeStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    storeDestination: (state, action) => {
      state.destination = action.payload;
    },
  },
});

export const {
  storeStationsOneRoute,
  storeStationsTwoRoute,
  storeStationsThreeRoute,
  storeStartLocation,
  storeDestination,
} = storeStationsOneRouteSlice.actions;

export default storeStationsOneRouteSlice.reducer;
