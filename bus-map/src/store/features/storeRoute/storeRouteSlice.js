import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    routeId: null
}

export const storeRouteSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        // action
        storeRouteId: (state, action) => {
            state.routeId = action.payload;
        }
    }
})

export const {storeRouteId} = storeRouteSlice.actions;

export default storeRouteSlice.reducer;
